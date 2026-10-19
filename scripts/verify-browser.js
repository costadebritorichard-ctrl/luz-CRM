// Local smoke check using Chrome's DevTools protocol, without npm dependencies.
const {spawn}=require('node:child_process');
const fs=require('node:fs'),os=require('node:os'),path=require('node:path'),assert=require('node:assert/strict');
const chrome=process.env.CHROME_PATH||'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const root=path.resolve(__dirname,'..'),profile=fs.mkdtempSync(path.join(os.tmpdir(),'luz-crm-browser-'));
const server=spawn(process.execPath,['server.js'],{cwd:root,env:{...process.env,PORT:'3097'},windowsHide:true,stdio:'ignore'});
const browser=spawn(chrome,['--headless=new','--disable-gpu','--no-first-run','--no-default-browser-check','--remote-debugging-port=0','--user-data-dir='+profile,'about:blank'],{windowsHide:true,stdio:'ignore'});
let socket,seq=0;const pending=new Map(),errors=[];
async function until(fn){for(let n=0;n<100;n++){try{const value=await fn();if(value)return value}catch{}await new Promise(r=>setTimeout(r,100))}throw Error('Tempo esgotado aguardando navegador/servidor');}
function call(method,params={}){return new Promise((resolve,reject)=>{const id=++seq;pending.set(id,{resolve,reject});socket.send(JSON.stringify({id,method,params}));setTimeout(()=>{if(pending.has(id)){pending.delete(id);reject(Error('CDP timeout: '+method))}},10000).unref()})}
async function evaluate(expression){const r=await call('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw Error(r.exceptionDetails.text+' '+JSON.stringify(r.exceptionDetails.exception));return r.result.value}
async function submit(values){await evaluate(`(()=>{const f=document.querySelector('#modal-form');for(const [name,value] of Object.entries(${JSON.stringify(values)})){const el=f.elements.namedItem(name);el.value=value;el.dispatchEvent(new Event('change',{bubbles:true}))}f.requestSubmit()})()`);await new Promise(r=>setTimeout(r,100));const err=await evaluate(`document.querySelector('#modal-form .error')?.textContent`);assert.ok(!err,err)}
async function click(action){await evaluate(`document.querySelector('[data-action="${action}"]').click()`);await new Promise(r=>setTimeout(r,100))}
(async()=>{
 try{
  await until(()=>fetch('http://127.0.0.1:3097/').then(r=>r.ok));
  const port=await until(()=>fs.existsSync(path.join(profile,'DevToolsActivePort'))&&fs.readFileSync(path.join(profile,'DevToolsActivePort'),'utf8').split('\n')[0]);
  const pages=await fetch('http://127.0.0.1:'+port+'/json/list').then(r=>r.json());
  const target=pages.find(p=>p.type==='page'&&!p.url.startsWith('chrome-extension:'));assert.ok(target,'Nenhuma aba disponível para teste');
  socket=new WebSocket(target.webSocketDebuggerUrl);await new Promise((resolve,reject)=>{socket.onopen=resolve;socket.onerror=reject});
  socket.onmessage=event=>{const m=JSON.parse(event.data);if(m.id){const item=pending.get(m.id);pending.delete(m.id);if(item)m.error?item.reject(Error(JSON.stringify(m.error))):item.resolve(m.result)}else if(m.method==='Runtime.exceptionThrown')errors.push(m.params.exceptionDetails)};
  await call('Runtime.enable');await call('Page.enable');await call('Page.navigate',{url:'http://127.0.0.1:3097/'});
  await until(()=>evaluate("typeof state!=='undefined'&&state?.users.length===2&&document.querySelector('#auth-form')!==null"));
  await evaluate("user=state.users.find(u=>u.role==='Administrador');lastActivity=Date.now();render();navigate('emails');emailTab='automations';render()");
  await click('intake-new');await submit({name:'Fluxo Site Browser',origin:'Site',stage:'2'});
  await submit({owner:'admin',listId:'list-2',taskText:'Ligar para o novo contato',days:'2'});await click('intake-activate');
  assert.equal(await evaluate('state.intakeRules[0].active'),true);
  await evaluate("contactForm()");await submit({name:'Pessoa Browser',type:'PF',email:'browser@exemplo.com',phone:'',document:''});await submit({origin:'Site',stage:'0',owner:'admin'});
  const id=await evaluate("state.contacts.find(c=>c.email==='browser@exemplo.com').id");
  assert.equal(await evaluate(`state.contacts.find(c=>c.id==='${id}').stage`),2);assert.equal(await evaluate('state.tasks.filter(t=>t.intakeRunId).length'),1);
  assert.match(await evaluate("document.querySelector('#modal').textContent"),/Resultado do pós-cadastro/);
  await evaluate(`closeModal();convertForm('${id}')`);await submit({mode:'Recorrente',amount:'100',due:'10'});
  await evaluate(`closeModal();profile('${id}')`);assert.match(await evaluate("document.querySelector('#modal').textContent"),/Sócio Inscrito/);
  await evaluate(`closeModal();statusForm('${id}')`);await submit({status:'Suspenso',date:await evaluate('D.today()'),reason:'Suspensão de demonstração'});
  assert.equal(await evaluate(`state.contacts.find(c=>c.id==='${id}').plan.status`),'Suspenso');
  // Selection survives filter changes and cancel has no effect.
  await evaluate("closeModal();listContacts('list-1')");const before=await evaluate("state.lists.find(l=>l.id==='list-1').contacts.length");
  await evaluate("document.querySelector('#list-all').click();const q=document.querySelector('#modal-form [name=q]');q.value='sem resultado';q.dispatchEvent(new Event('input'))");
  assert.match(await evaluate("document.querySelector('.selection-summary').textContent"),/fora do resultado atual/);
  await evaluate('closeModal()');assert.equal(await evaluate("state.lists.find(l=>l.id==='list-1').contacts.length"),before);
  await evaluate("listContacts('list-1')");await evaluate("const pick=document.querySelector('#modal-form [name=status]');pick.value='Suspenso';pick.dispatchEvent(new Event('input'));document.querySelector('#list-all').click();document.querySelector('#modal-form').requestSubmit()");await new Promise(r=>setTimeout(r,100));
  assert.equal(await evaluate(`state.lists.find(l=>l.id==='list-1').contacts.includes('${id}')`),true);
  await evaluate(`closeModal();D.payment(state,user,{contactId:'${id}',amount:50,date:D.today(),period:D.month(),destination:'Obras sociais',pix:'BROWSER-PIX'});save();profile('${id}')`);
  assert.equal(await evaluate(`D.enrolled(state,state.contacts.find(c=>c.id==='${id}'))`),false);
  const paymentId=await evaluate(`state.payments.find(p=>p.contactId==='${id}').id`);
  await evaluate(`closeModal();receipt('${paymentId}')`);await click('receipt-email');await submit({recipient:'outro@exemplo.com',subject:'Recibo Browser',body:'Obrigado pela contribuição'});await click('receipt-send-local');
  assert.equal(await evaluate('state.receiptSends.length'),1);assert.equal(await evaluate(`state.contacts.find(c=>c.id==='${id}').email`),'browser@exemplo.com');
  await evaluate("closeModal();navigate('emails');emailTab='messages';render()");
  assert.equal(await evaluate("document.querySelector('.nav-item[data-id=automations]')===null"),true);
  await click('email-new');await evaluate("const leads=document.querySelector('[name=recipientLink]');leads.value='leads';leads.dispatchEvent(new Event('change'));document.querySelector('[data-action=email-pick][data-id=\"contact-8\"]').click()");
  await submit({subject:'Único Browser',body:'Mensagem com agendamento único',kind:'once'});
  const sendAt=await evaluate('localDateTime(new Date(Date.now()+3600000).toISOString())');await submit({delivery:'scheduled',startAt:sendAt});await click('email-activate-local');
  const onceId=await evaluate('state.mailings[0].id');assert.equal(await evaluate('state.mailingRuns.length'),0);
  await evaluate(`emailMailingDetail('${onceId}')`);await click('email-simulate');assert.equal(await evaluate('state.mailingRuns.length'),1);assert.equal(await evaluate(`state.mailings.find(m=>m.id==='${onceId}').status`),'completed');
  await evaluate('closeModal()');await click('email-new');await evaluate("document.querySelector('[data-action=email-pick][data-id=\"contact-8\"]').click()");
  await evaluate("const kind=document.querySelector('[name=kind]');kind.value='recurring';kind.dispatchEvent(new Event('change'))");assert.equal(await evaluate("document.querySelector('#email-recurrence-fields').hidden"),false);await evaluate("const frequency=document.querySelector('[name=frequency]');frequency.value='monthly';frequency.dispatchEvent(new Event('change'))");assert.equal(await evaluate("document.querySelector('#email-weekday-field').hidden||document.querySelector('#email-month-week-field').hidden"),false);await submit({subject:'Recorrente Browser',body:'Mensagem semanal',kind:'recurring',frequency:'weekly',weekday:String(new Date().getDay()),endDate:''});await submit({delivery:'immediate'});await click('email-activate-local');
  const recurringId=await evaluate('state.mailings[0].id');assert.equal(await evaluate('state.mailings[0].weekday'),new Date().getDay());assert.equal(await evaluate('state.mailingRuns.length'),2);assert.equal(await evaluate(`state.mailings.find(m=>m.id==='${recurringId}').status`),'active');
  await click('email-pause');assert.equal(await evaluate(`state.mailings.find(m=>m.id==='${recurringId}').nextAt`),null);
  await click('email-review');await click('email-activate-local');assert.equal(await evaluate('state.mailingRuns.length'),2);
  await click('email-cancel');await click('email-cancel-local');assert.equal(await evaluate(`state.mailings.find(m=>m.id==='${recurringId}').status`),'cancelled');
  await click('email-new');await evaluate("document.querySelector('[data-action=email-pick][data-id=\"contact-8\"]').click()");await submit({subject:'Mensal Browser',body:'Mensagem mensal',kind:'recurring',frequency:'monthly',weekday:'5',monthWeek:'-1',endDate:''});await submit({delivery:'immediate'});assert.equal(await evaluate('state.mailings[0].monthWeek'),-1);await evaluate('closeModal()');await evaluate("emailTab='history';render()");assert.match(await evaluate("document.querySelector('main').textContent"),/Único Browser/);assert.match(await evaluate("document.querySelector('main').textContent"),/Recorrente Browser/);
  await evaluate("closeModal();navigate('reports');reportPrint()");
  assert.ok(await evaluate("document.querySelector('.print-report table')!==null"));assert.match(await evaluate("document.querySelector('.print-report').textContent"),/Relatório administrativo/);
  const pdf=await call('Page.printToPDF',{printBackground:true,preferCSSPageSize:true});assert.ok(Buffer.from(pdf.data,'base64').length>1000);
  // Check a longer report and narrow-screen document bounds.
  await evaluate("closeModal();for(let i=0;i<100;i++)state.payments.push({...state.payments[0],id:'print-'+i,receipt:'TESTE-'+i});reportPrint()");
  const longPdf=await call('Page.printToPDF',{printBackground:true,preferCSSPageSize:true});const pdfText=Buffer.from(longPdf.data,'base64').toString('latin1');assert.ok((pdfText.match(/\/Type\s*\/Page\b/g)||[]).length>1);
  await call('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});await evaluate("closeModal();navigate('emails');emailTab='automations';render()");
  assert.ok(await evaluate('document.documentElement.scrollWidth<=window.innerWidth+2'));
  await evaluate('save()');await call('Page.reload');await until(()=>evaluate("typeof state!=='undefined'&&state?.contacts.some(c=>c.email==='browser@exemplo.com')"));
  assert.equal(await evaluate('state.tasks.filter(t=>t.intakeRunId).length'),1);assert.equal(await evaluate('state.receiptSends.length'),1);assert.equal(await evaluate('state.mailingRuns.length'),2);assert.deepEqual(errors,[]);
  console.log('Browser OK: E-mails, seleção, único agendado, recorrência, pausa/retomada, cancelamento, histórico, cadastro, regras, suspensão, recibos, PDF, celular e recarga.');
 }catch(e){
  if(socket?.readyState===1){try{console.error('Estado do navegador:',await evaluate("({url:location.href,text:document.body?.innerText.slice(0,1000),users:typeof state==='undefined'?null:state?.users.length})"));console.error('Erros:',JSON.stringify(errors))}catch{}}
  throw e;
 }finally{
  if(socket)socket.close();browser.kill();server.kill();
  // The directory is a unique test profile created above, never a user profile.
  await new Promise(r=>setTimeout(r,500));if(path.dirname(profile)===os.tmpdir()&&path.basename(profile).startsWith('luz-crm-browser-')){try{fs.rmSync(profile,{recursive:true,force:true})}catch{}}
 }
})().catch(e=>{console.error(e);process.exitCode=1});
