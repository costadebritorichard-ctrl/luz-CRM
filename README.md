# CRM · Luz da Esperança

Protótipo funcional para revisão dos requisitos e da interface. Feito com HTML, CSS e JavaScript, sem dependências de instalação e sem banco de dados. O servidor Node entrega apenas arquivos estáticos; as operações são simuladas no navegador.

## Abrir o protótipo

Com Node.js instalado, execute na pasta do projeto:

```powershell
node server.js
```

Abra **http://localhost:3000**. Para outra porta: `$env:PORT=3001` antes do comando. Para encerrar o servidor, use `Ctrl+C`.

Na tela de entrada, os botões **Administrador** e **Operador** preenchem as credenciais e entram com as contas de demonstração:

| Perfil | E-mail | Senha inicial |
| --- | --- | --- |
| Administrador | admin@luz.exemplo | Esperanca@2026 |
| Operador de Captação | operador@luz.exemplo | Esperanca@2026 |

Os 24 contatos iniciais são fictícios. As datas das contribuições são ajustadas ao mês atual. Alterações ficam em `localStorage`, apenas no navegador utilizado; a sessão fica em `sessionStorage`. Para reiniciar a demonstração, limpe o armazenamento de **localhost:3000** nas ferramentas do navegador e recarregue. Se você redefinir a senha de uma conta, os botões de demonstração continuam usando a senha inicial: entre manualmente com a nova senha ou reinicie os dados.

## Percurso sugerido

1. Entre como Administrador e explore o painel.
2. Cadastre um contato em **Contatos**. O formulário tem duas etapas, com no máximo cinco campos por etapa.
3. Abra a ficha, registre uma interação e movimente as etapas. No **Funil**, o quadro compacto permite arrastar cartões, enquanto a opção **Lista** apresenta os contatos em linhas. No celular, escolha a etapa pelos botões acima do quadro. O botão de mover funciona no tablet e com teclado.
4. Converta o contato em doador pontual ou recorrente e confira seu comprovante de adesão.
5. Registre uma contribuição. Informe referência Pix ou anexe PNG, JPG ou PDF de até 2 MB. Confira a baixa, o recibo, o histórico e a atualização dos indicadores.
6. Em **Doações e pendências**, selecione uma competência em aberto e clique em **Dar baixa**. Pagamentos parciais reduzem o saldo; a quitação elimina a pendência.
7. Em **Listas e campanhas**, abra uma lista, adicione contatos existentes ou importe CSV/Excel `.xlsx`. O botão de modelo CSV mostra as colunas esperadas. Nova campanha permite escolher uma lista, redigir a mensagem, revisar e confirmar o envio simulado. A tela mantém o contador e o histórico de campanhas realizadas.
8. Em **E-mails → Novo e-mail**, escreva assunto e mensagem, escolha **Único** ou **Recorrente** e selecione destinatários por busca, vínculo, lista ou origem. Escolha o momento do envio e, para recorrência, frequência diária, semanal ou mensal e término opcional. Salve, revise e confirme a ativação. Também é possível começar em **Contatos → Redigir e-mail**, preservando a seleção de várias páginas. Descadastrados e contatos sem e-mail válido ficam indisponíveis.
9. Na ficha, registre uma resposta com **Pedido de descadastro**. O contato ficará fora dos próximos envios.
10. Em **Usuários e acessos**, crie um operador, edite o perfil ou inative o acesso. Saia e explore o perfil Operador para verificar as restrições.
11. Teste **Esqueci minha senha**. A mensagem de recuperação simulada mostra um link válido por 15 minutos, de uso único.

## Rastreabilidade dos requisitos

Os ajustes AJ-01 a AJ-09 estão disponíveis no protótipo. Em **E-mails → Automações → Tratamento pós-cadastro**, configure e ative uma regra por origem/classificação antes de cadastrar um contato novo. A regra pode definir etapa, responsável fixo, lista de entrada e tarefa com prazo; mensagens usam as regras de e-mail existentes. Regras novas ficam pausadas até revisão, sem aplicação retroativa. A tela E-mails substitui o antigo item Automações do menu e preserva suas configurações e históricos.

**Suspenso** preserva débitos anteriores e exclui competências cujo vencimento esteja no intervalo de suspensão (início inclusivo, retomada exclusiva). Recebimentos não reativam esse status. **Sócio Inscrito** identifica adesão sem nenhuma contribuição, com aviso na ficha e na tabela; o primeiro recebimento remove a condição. A inclusão em listas oferece busca, segmentação e seleção de todos os resultados, preservando escolhas entre filtros.

O recibo permite **Enviar por e-mail**, com revisão e histórico de envio simulado, sem entrega real ou transmissão de PDF. Relatórios administrativos oferecem **Exportar CSV** e **Exportar PDF**; a segunda opção usa a impressão do navegador para salvar o arquivo. As políticas aplicadas à demonstração estão detalhadas em [AJUSTES-SOLICITADOS-DO-PROTOTIPO.md](AJUSTES-SOLICITADOS-DO-PROTOTIPO.md).

Validação: `npm test`, `npm run check` e `npm run build`. Para testar os fluxos no Chrome sem interface, execute `node scripts/verify-browser.js` (Windows com Chrome instalado, ou caminho do executável em `CHROME_PATH`). O teste usa perfil temporário e servidor próprio na porta 3097.

Fonte: os dois PDFs em `Dossiê - CRM/04_Engenharia_de_Requisitos`.

| Requisito | Implementação |
| --- | --- |
| RF-001 — Leads | PF/PJ, nome, e-mail/telefone, CPF/CNPJ com máscara e dígitos verificadores, origem, funil e etapa. Bloqueio de duplicidade por e-mail/documento. |
| RF-002 — Etapas | Movimentação por formulário ou arraste, com data, operador, anotação e histórico preservado. |
| RF-003 — Listas | Cadastro/edição, categorias, seleção de contatos, importação CSV e Excel `.xlsx`, descarte de duplicados/inválidos e relatório por importação. |
| RF-004 — E-mails | Revisão e envio simulado por lista, individual ou por seleção múltipla em Contatos, histórico com data/hora, respostas positiva/negativa/descadastro e bloqueio de opt-out. |
| RF-005 — Relacionamento | Interações por telefone, WhatsApp, reunião ou e-mail, resumo, data do contato e responsável. Sem ação de edição ou remoção das anotações. |
| RF-006 — Conversão | Modalidade, valor, dia do vencimento recorrente, doador ativo e comprovante de adesão imprimível. Exclusão de contato com histórico financeiro bloqueada. |
| RF-007 — Recorrência | Ativo, Inadimplente, Pausado, Suspenso e Cancelado; motivo, data e histórico. Suspensão preserva débitos anteriores e interrompe competências pelo vencimento. Dois meses anteriores consecutivos elegíveis sem pagamento confirmado geram inadimplência e ação de reengajamento. Filtros de doadores e pendências. |
| RF-008 — Recebimentos | Doador obrigatório, valor, data, referência/comprovante Pix, destinação, competência, baixas parciais/totais e recibo digital imprimível. |
| RF-009 — Monetário | Apenas valores numéricos em reais, maiores que zero. Sem cadastro de itens físicos. |
| RF-010 — Kanban | Quadro compacto e alternativa em lista, quatro etapas de maturidade, filtros de mês de cadastro, origem, operador e funil, busca e atualização imediata após movimento. |
| RF-011 — Relatórios | Totais mensais, recorrentes/pontuais, destinação, avanço por etapa da coorte de contatos cadastrados no período, filtros, exportação CSV e versão de impressão/PDF. Valores financeiros calculados sobre os recebimentos. |
| RF-012 — Acesso | Login, logout, recuperação simulada, hash PBKDF2-SHA-256 com sal individual, limitação após cinco tentativas e encerramento após 30 minutos de inatividade. |
| RF-013 — Usuários | Cadastro, edição e inativação; perfis Administrador e Operador de Captação; menus e ações administrativas restritos; proteção do próprio acesso e do último administrador. |
| RNF-001 — Usabilidade | Formulários por etapas com até cinco campos de entrada; ações diretas na ficha e baixa com dados preenchidos pela pendência. |
| RNF-002 — Integridade | Validação de contatos, doador, valor, datas, competências, duplicidade Pix e formatos dos comprovantes. |
| RNF-003 — Auditoria | Registros com data/hora e identificador/nome do usuário; painel administrativo e linha do tempo por contato. |
| RNF-004 — Interface | Layout responsivo para computadores/tablets/celulares, HTML semântico, labels, navegação por teclado e modal com foco. Sem bibliotecas, fontes ou serviços de rede no carregamento. |

A interpretação da regra de recorrência usa o status **Inadimplente** após dois meses consecutivos inteiros sem recebimento confirmado; **Pausado** é uma mudança manual. A recuperação automática para Ativo acontece quando as pendências vencidas são quitadas. O vencimento mensal fica entre os dias 1 e 28 para existir em todos os meses. Doadores Pausados e Cancelados não aparecem na geração de pendências enquanto estiverem nesses estados.

## Identidade visual

O botão de sol/lua na tela de entrada e no cabeçalho alterna entre os temas claro e escuro. A preferência é salva neste navegador e permanece após sair ou recarregar a página. Sem escolha salva, o tema acompanha a configuração do dispositivo. Recibos e comprovantes de adesão mantêm fundo branco na impressão e ao salvar PDF.

Para verificar o tema em um navegador dedicado com depuração na porta 9222 e o servidor na porta 3000, execute `node tests/theme-browser.js`. Esse teste limpa os dados do navegador de teste; uma porta alternativa pode ser definida pela variável `CDP_PORT`.

Paleta e direção definidas nos brandbooks em `referencia - design`: verde esperança `#5B8C3E`, dourado terra `#8C6D46`, branco-osso `#FAF7F2`, espaço em branco e linguagem acolhedora. A logo institucional fornecida em `favicon.png` aparece no acesso, no menu, nos recibos e nos comprovantes de adesão, e é usada como ícone da aba do navegador. A composição tipográfica segue serifada para títulos e humanista para textos; como não há arquivos de fontes na referência, usa Georgia e Segoe UI locais como alternativas a Lora e Nunito, sem depender de internet.

## O que está simulado

Em **E-mails → Automações**, Administrador e Operador podem configurar boas-vindas para novos contatos Inbound, mensagens de entrada em etapa e agradecimento por contribuição. Revise e ative um dos três modelos iniciais ou crie uma regra, escolhendo origem, classificação, etapa, mensagem e envio imediato ou após intervalo. As regras começam pausadas; ativar não envia mensagens para eventos antigos. O histórico permite consultar resultados, cancelar pendências, antecipar uma execução com **Simular agora** e repetir uma falha. Pausar ou editar uma regra cancela suas pendências. A saída da cadência cancela boas-vindas e acompanhamento pendentes. Não há envio real nem processamento com a aplicação fechada: prazos vencidos são avaliados ao reabrir. O agradecimento não anexa recibo; o envio simulado do recibo tem fluxo próprio.

Em **E-mails → Envios e recorrências**, cada mensagem tem destinatários fixos escolhidos pelo usuário, revisão e ativação explícitas. Envios únicos podem ser imediatos ou agendados. Recorrências usam o horário local do navegador e permitem pausar, retomar e cancelar; editar exige nova revisão e preserva versões anteriores no histórico. Meses curtos usam o último dia disponível e depois retornam ao dia original. Ao reabrir após vários períodos, uma ocorrência pendente pode ser simulada e as demais são ignoradas, sem rajada; após o término, nenhuma é enviada. Retomar usa o próximo horário futuro. A elegibilidade é reavaliada em cada execução, incluindo descadastro e, nas recorrências, suspensão e saída da cadência. **Histórico** reúne envios únicos, recorrentes, automações, recibos e campanhas anteriores sem duplicar suas entradas.

- E-mails são registrados no histórico; nenhum e-mail real é enviado. A recuperação mostra a mensagem dentro da aplicação.
- Pix não consulta banco nem processa pagamento: o operador confirma o recebimento manualmente.
- Recibos e adesões podem ser impressos ou salvos em PDF pelo navegador; os dados são demonstrativos.
- As regras de recorrência são avaliadas ao abrir/entrar na aplicação, sem serviço agendado em segundo plano.
- Persistência, autenticação, permissões e auditoria são locais e servem para testar a experiência. Não constituem proteção de produção: quem controla o navegador pode alterar seu armazenamento. Não utilize dados pessoais reais.
- Arquivos Excel suportados: `.xlsx`, primeira planilha, valores das células ou resultados de fórmulas já calculados. `.xls` binário antigo deve ser convertido para `.xlsx` ou CSV. Planilhas de até 5 MB e 10.000 contatos; Chrome/Edge atuais permitem a descompressão nativa.
- Comprovantes ficam no armazenamento local, sujeitos à quota do navegador. Um erro de armazenamento é comunicado e os dados da sessão continuam em memória.

## Verificação

```powershell
npm.cmd run check
npm.cmd test
```

Os testes de domínio verificam contatos, documentos, histórico, conversão, baixas parciais, duplicidade Pix, inadimplência, importação e descadastro. `tests/browser-smoke.js` usa o protocolo CDP nativo do Chrome e requer um navegador de teste já aberto com depuração na porta 9222 e o servidor na porta 3000. O teste usa um perfil de navegador dedicado, limpa seus dados locais ao finalizar e cobre as nove telas, logo institucional, quadro compacto/lista/arraste, seleção entre páginas, composição e revisão de e-mail, cadastro até recibo, baixa financeira, CSV, Excel, envio, opt-out, proteção de exclusão, perfis, layout móvel, sessão e recuperação. Capturas de tela estão em `previews/`.

Estrutura: `index.html` (entrada), `styles.css` (identidade e responsividade), `app.js` (interface e fluxos), `domain.js` (regras de negócio), `server.js` (arquivos estáticos) e `tests/` (verificações).
## Publicação no GitHub Pages

O projeto está preparado para um repositório **privado** e publicação por GitHub Actions. O plano da conta deve permitir Pages em repositórios privados (Pro, Team ou Enterprise). Em uma conta pessoal, o site publicado é normalmente público mesmo quando o repositório é privado. O login do protótipo é demonstrativo; não restringe o acesso aos arquivos publicados.

O workflow `.github/workflows/pages.yml` verifica a sintaxe, executa os testes, monta o site e publica a cada push na branch `main`. Pull requests executam as verificações sem publicar. Também é possível disparar o workflow manualmente pela aba Actions.

```powershell
npm.cmd run build
```

O diretório `dist/` contém apenas `index.html`, `styles.css`, `app.js`, `domain.js`, `favicon.png` e `.nojekyll`. Os links relativos funcionam em `https://CONTA.github.io/NOME-DO-REPOSITORIO/`. O servidor Node, os testes, os dossiês e os arquivos de referência não entram no site. O build rejeita arquivos inesperados em `dist/` para evitar publicações acidentais.

Para ativar a hospedagem no remoto, escolha **Settings → Pages → Build and deployment → Source → GitHub Actions**. Após ativar, execute novamente o workflow se o primeiro push tiver ocorrido antes da configuração. A URL final aparecerá no ambiente `github-pages` e no resultado da ação de deploy.

O `.gitignore` mantém os documentos originais e as referências de design apenas na pasta local. O repositório do protótipo inclui seu código, logo, instruções, testes e configuração de publicação.

Documentação: [criação de sites no Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site) e [workflows personalizados](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

Na recorrência semanal, o campo **Dia da semana** permite escolher de domingo a sábado. O primeiro envio ocorre no dia escolhido, a partir da confirmação ou da data agendada, preservando o horário local; os seguintes repetem esse dia semanalmente. Programa??es antigas preservam seu dia original.

Na frequência **Mensal**, escolha a **ocorrência no mês** (primeira, segunda, terceira, quarta ou última) e o **dia da semana**. Exemplo: primeira segunda-feira ou última sexta-feira. O envio ocorre uma vez por mês, no horário definido, sem antecipar a data inicial. Programa??es mensais antigas sem esses campos preservam a regra anterior de dia do mês.


Contatos antigos de Site ou Instagram com classificação incorreta são corrigidos para Inbound ao recarregar, incluindo doadores. A correção é auditada e preserva cadastros, listas e histórico financeiro, sem disparar novas boas-vindas.
