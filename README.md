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
7. Em **Listas e campanhas**, abra uma lista, adicione contatos existentes ou importe CSV/Excel `.xlsx`. O botão de modelo CSV mostra as colunas esperadas. Revise uma campanha e confirme o envio simulado.
8. Em **Contatos**, marque destinatários na tabela, inclusive em páginas diferentes, e clique em **Redigir e-mail**. Você também pode abrir o editor sem seleção e escolher destinatários nele, usando busca ou seleção de todos os resultados. Preencha assunto e mensagem, revise a lista e confirme o envio simulado. A seleção respeita contatos descadastrados e e-mails válidos.
9. Na ficha, registre uma resposta com **Pedido de descadastro**. O contato ficará fora dos próximos envios.
10. Em **Usuários e acessos**, crie um operador, edite o perfil ou inative o acesso. Saia e explore o perfil Operador para verificar as restrições.
11. Teste **Esqueci minha senha**. A mensagem de recuperação simulada mostra um link válido por 15 minutos, de uso único.

## Rastreabilidade dos requisitos

Fonte: os dois PDFs em `Dossiê - CRM/04_Engenharia_de_Requisitos`.

| Requisito | Implementação |
| --- | --- |
| RF-001 — Leads | PF/PJ, nome, e-mail/telefone, CPF/CNPJ com máscara e dígitos verificadores, origem, funil e etapa. Bloqueio de duplicidade por e-mail/documento. |
| RF-002 — Etapas | Movimentação por formulário ou arraste, com data, operador, anotação e histórico preservado. |
| RF-003 — Listas | Cadastro/edição, categorias, seleção de contatos, importação CSV e Excel `.xlsx`, descarte de duplicados/inválidos e relatório por importação. |
| RF-004 — E-mails | Revisão e envio simulado por lista, individual ou por seleção múltipla em Contatos, histórico com data/hora, respostas positiva/negativa/descadastro e bloqueio de opt-out. |
| RF-005 — Relacionamento | Interações por telefone, WhatsApp, reunião ou e-mail, resumo, data do contato e responsável. Sem ação de edição ou remoção das anotações. |
| RF-006 — Conversão | Modalidade, valor, dia do vencimento recorrente, doador ativo e comprovante de adesão imprimível. Exclusão de contato com histórico financeiro bloqueada. |
| RF-007 — Recorrência | Ativo, Inadimplente, Pausado e Cancelado; motivo, data e histórico. Dois meses anteriores consecutivos sem pagamento confirmado geram inadimplência e ação de reengajamento. Filtros de doadores e pendências. |
| RF-008 — Recebimentos | Doador obrigatório, valor, data, referência/comprovante Pix, destinação, competência, baixas parciais/totais e recibo digital imprimível. |
| RF-009 — Monetário | Apenas valores numéricos em reais, maiores que zero. Sem cadastro de itens físicos. |
| RF-010 — Kanban | Quadro compacto e alternativa em lista, quatro etapas de maturidade, filtros de mês de cadastro, origem, operador e funil, busca e atualização imediata após movimento. |
| RF-011 — Relatórios | Totais mensais, recorrentes/pontuais, destinação, conversão por etapa da coorte de contatos cadastrados no período, filtros e exportação CSV. Valores financeiros calculados sobre os recebimentos. |
| RF-012 — Acesso | Login, logout, recuperação simulada, hash PBKDF2-SHA-256 com sal individual, limitação após cinco tentativas e encerramento após 30 minutos de inatividade. |
| RF-013 — Usuários | Cadastro, edição e inativação; perfis Administrador e Operador de Captação; menus e ações administrativas restritos; proteção do próprio acesso e do último administrador. |
| RNF-001 — Usabilidade | Formulários por etapas com até cinco campos de entrada; ações diretas na ficha e baixa com dados preenchidos pela pendência. |
| RNF-002 — Integridade | Validação de contatos, doador, valor, datas, competências, duplicidade Pix e formatos dos comprovantes. |
| RNF-003 — Auditoria | Registros com data/hora e identificador/nome do usuário; painel administrativo e linha do tempo por contato. |
| RNF-004 — Interface | Layout responsivo para computadores/tablets/celulares, HTML semântico, labels, navegação por teclado e modal com foco. Sem bibliotecas, fontes ou serviços de rede no carregamento. |

A interpretação da regra de recorrência usa o status **Inadimplente** após dois meses consecutivos inteiros sem recebimento confirmado; **Pausado** é uma mudança manual. A recuperação automática para Ativo acontece quando as pendências vencidas são quitadas. O vencimento mensal fica entre os dias 1 e 28 para existir em todos os meses. Doadores Pausados e Cancelados não aparecem na geração de pendências enquanto estiverem nesses estados.

## Identidade visual

Paleta e direção definidas nos brandbooks em `referencia - design`: verde esperança `#5B8C3E`, dourado terra `#8C6D46`, branco-osso `#FAF7F2`, espaço em branco e linguagem acolhedora. A logo institucional fornecida em `favicon.png` aparece no acesso, no menu, nos recibos e nos comprovantes de adesão, e é usada como ícone da aba do navegador. A composição tipográfica segue serifada para títulos e humanista para textos; como não há arquivos de fontes na referência, usa Georgia e Segoe UI locais como alternativas a Lora e Nunito, sem depender de internet.

## O que está simulado

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
