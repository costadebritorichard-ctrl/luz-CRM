// Requer o servidor na porta 3000 e um navegador de teste com CDP na porta 9222.
'use strict';
const assert=require('node:assert/strict');
(async()=>{
  const tabs=await(await fetch(`http://127.0.0.1:${process.env.CDP_PORT||9222}/json`)).json();
  const ws=new WebSocket(tabs.find(t=>t.type==='page').webSocketDebuggerUrl);
  await new Promise(resolve=>ws.addEventListener('open',resolve,{once:true}));
  let seq=0;const pending=new Map(),errors=[];
  ws.addEventListener('message',e=>{const m=JSON.parse(e.data);if(m.id){const p=pending.get(m.id);pending.delete(m.id);m.error?p.reject(m.error):p.resolve(m.result)}else if(m.method==='Runtime.exceptionThrown')errors.push(m.params.exceptionDetails.text)});
  const call=(method,params={})=>new Promise((resolve,reject)=>{const id=++seq;pending.set(id,{resolve,reject});ws.send(JSON.stringify({id,method,params}))});
  const evaluate=async expression=>{const r=await call('Runtime.evaluate',{expression,awaitPromise:true,returnByValue:true});if(r.exceptionDetails)throw Error(r.exceptionDetails.exception?.description||r.exceptionDetails.text);return r.result.value};
  const wait=async expression=>{for(let i=0;i<100;i++){if(await evaluate(expression))return;await new Promise(r=>setTimeout(r,50))}throw Error('Timeout: '+expression)};
  const click=selector=>evaluate(`document.querySelector(${JSON.stringify(selector)}).click()`);
  try{
    await call('Runtime.enable');await call('Page.enable');
    await call('Emulation.setDeviceMetricsOverride',{width:1440,height:1050,deviceScaleFactor:1,mobile:false});
    await call('Page.navigate',{url:'http://localhost:3000'});
    await wait(`!!document.querySelector('#auth-form')`);
    await evaluate('localStorage.clear();sessionStorage.clear()');
    await call('Emulation.setEmulatedMedia',{features:[{name:'prefers-color-scheme',value:'dark'}]});
    await call('Page.reload');await wait(`!!document.querySelector('#auth-form')`);
    assert.equal(await evaluate('document.documentElement.dataset.theme'),'dark');
    await click('[data-action=theme]');
    assert.equal(await evaluate('document.documentElement.dataset.theme'),'light');
    assert.equal(await evaluate(`localStorage.getItem('luz-crm-theme')`),'light');
    await call('Page.reload');await wait(`!!document.querySelector('#auth-form')`);
    assert.equal(await evaluate('document.documentElement.dataset.theme'),'light');
    await click('[data-action=theme]');
    assert.equal(await evaluate(`document.querySelector('[data-action=theme]').getAttribute('aria-label')`),'Ativar tema claro');
    await click('[data-action=demo][data-id=admin]');await wait(`!!document.querySelector('main')`);
    for(const page of ['dashboard','funnel','contacts','donors','lists','finance','reports','users','audit']){
      await click(`[data-action=nav][data-id=${page}]`);
      assert.equal(await evaluate('document.documentElement.dataset.theme'),'dark');
      assert.equal(await evaluate(`getComputedStyle(document.querySelector('.topbar')).backgroundColor`),'rgb(30, 40, 33)');
      assert.equal(await evaluate('document.documentElement.scrollWidth<=innerWidth'),true);
    }
    await click('[data-action=nav][data-id=contacts]');
    await click('[data-action=profile][data-id=contact-8]');
    assert.equal(await evaluate(`getComputedStyle(document.querySelector('dialog')).backgroundColor`),'rgb(30, 40, 33)');
    await click('[data-action=convert][data-id=contact-8]');
    await evaluate(`const mode=document.querySelector('#modal [name=mode]');mode.value='Pontual';mode.dispatchEvent(new Event('change'));`);
    assert.equal(await evaluate(`getComputedStyle(document.querySelector('#modal [name=due]').closest('.field')).display`),'none');
    await click('#modal [data-action=close]');
    await click('[data-action=profile][data-id=contact-0]');
    await click('[data-action=adherence][data-id=contact-0]');
    await call('Emulation.setEmulatedMedia',{media:'print'});
    assert.equal(await evaluate(`getComputedStyle(document.querySelector('dialog')).backgroundColor`),'rgb(255, 255, 255)');
    await call('Emulation.setEmulatedMedia',{media:'screen'});
    await click('#modal [data-action=close]');
    await call('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});
    assert.equal(await evaluate('document.documentElement.scrollWidth<=innerWidth'),true);
    await click('[data-action=theme]');
    assert.equal(await evaluate('document.documentElement.dataset.theme'),'light');
    await click('[data-action=logout]');await wait(`!!document.querySelector('#auth-form')`);
    assert.equal(await evaluate('document.documentElement.dataset.theme'),'light');
    assert.deepEqual(errors,[]);
    console.log('OK: preferência do dispositivo, alternância, persistência, nove telas, modal, vencimento pontual, impressão e celular.');
  }finally{
    await evaluate('localStorage.clear();sessionStorage.clear()');
    await call('Emulation.setEmulatedMedia',{media:'screen',features:[]});
    await call('Emulation.clearDeviceMetricsOverride');ws.close();
  }
})().catch(e=>{console.error(e);process.exit(1)});
