# CRM Luz da Esperança — Guia de apresentação do protótipo

**Documento de apoio à apresentação ao cliente**  
**Data:** 5 de outubro de 2026  
**Escopo:** telas e funcionalidades implementadas no protótipo atual.

## 1. Proposta do sistema

O CRM Luz da Esperança organiza o relacionamento com pessoas e empresas que podem apoiar as obras sociais da instituição. A proposta é acompanhar toda a jornada: conhecer um contato, cultivar o relacionamento, registrar sua adesão como doador e acompanhar as contribuições recebidas.

O sistema reúne informações que, no dia a dia, poderiam ficar espalhadas em planilhas, conversas e comprovantes. A equipe consegue identificar quem precisa de atendimento, o estágio de cada relacionamento, os valores recebidos e as contribuições mensais ainda pendentes.

**Sugestão de abertura:** “Vamos acompanhar o caminho de um contato desde sua chegada à instituição até sua primeira contribuição. Ao longo dessa jornada, veremos como o CRM apoia a captação, o relacionamento e o controle das doações.”

Este protótipo permite validar a organização das telas e as regras de trabalho. Os dados são fictícios; os envios de e-mail e a confirmação de recebimentos são demonstrativos.

## 2. Mapa das telas e dos perfis

Depois do login, o menu reúne nove telas principais. Formulários e documentos complementares abrem em janelas sobre a tela atual.

| Tela | Finalidade | Administrador | Operador de Captação |
| --- | --- | --- | --- |
| Visão geral | Acompanhar indicadores e prioridades | Sim | Não |
| Funil de captação | Organizar a evolução dos potenciais doadores | Sim | Sim |
| Contatos | Consultar e cadastrar pessoas e empresas | Sim | Sim |
| Doadores | Acompanhar quem já aderiu à contribuição | Sim | Sim |
| Listas e campanhas | Organizar públicos e registrar comunicações | Sim | Sim |
| Doações e pendências | Registrar recebimentos e dar baixa nas competências | Sim | Sim |
| Relatórios | Analisar arrecadação, destinações e conversão | Sim | Não |
| Usuários e acessos | Administrar os acessos da equipe | Sim | Não |
| Histórico de auditoria | Consultar ações e responsáveis | Sim | Não |

O Administrador também pode escolher o responsável no cadastro de contatos e excluir cadastros sem histórico financeiro. O Operador trabalha com contatos, doadores, listas, campanhas e lançamentos financeiros. O perfil de Operador não representa, no protótipo, uma restrição de visualização apenas aos próprios contatos.

O cabeçalho identifica o usuário e seu perfil, oferece saída do sistema e acesso às ações de relacionamento pelo ícone de sino. No celular, o menu lateral é aberto pelo botão de menu.

## 3. Entrada e recuperação de acesso

### 3.1. Tela de entrada

**Objetivo:** identificar quem está utilizando o CRM e disponibilizar as funções do seu perfil.

O usuário informa e-mail e senha. Os botões **Administrador** e **Operador** permitem entrar diretamente com as contas de demonstração. O Administrador começa na Visão geral; o Operador começa no Funil de captação.

| Conta de demonstração | E-mail | Senha inicial |
| --- | --- | --- |
| Administrador | admin@luz.exemplo | Esperanca@2026 |
| Operador de Captação | operador@luz.exemplo | Esperanca@2026 |

Após cinco tentativas incorretas, novas tentativas ficam bloqueadas por um minuto. A sessão é encerrada após 30 minutos de inatividade. O botão de saída encerra a sessão manualmente.

**Na apresentação:** entre como Administrador e, ao final, repita a entrada como Operador para mostrar a diferença dos menus.

### 3.2. Esqueci minha senha e redefinição

O usuário informa o e-mail cadastrado em **Esqueci minha senha**. Para uma conta ativa, o protótipo apresenta na própria aplicação uma mensagem com o link de recuperação. O link vale por 15 minutos e pode ser usado uma única vez.

Na tela de redefinição, são solicitadas uma nova senha e sua confirmação. A senha deve ter pelo menos oito caracteres, e os dois campos precisam coincidir.

**Na apresentação:** explique que a entrega do e-mail é simulada. Se alterar a senha de uma conta de demonstração, os botões de entrada rápida continuam usando a senha inicial; será necessário entrar manualmente com a nova senha.

## 4. Visão geral

**Objetivo:** oferecer ao Administrador uma visão rápida da captação e das contribuições.

A tela apresenta quatro indicadores principais:

| Indicador | O que significa |
| --- | --- |
| Arrecadado neste mês | Soma das contribuições registradas no mês atual |
| Doadores ativos | Quantidade de doadores com status Ativo |
| Receita mensal prevista | Soma dos compromissos recorrentes dos doadores ativos |
| Pendências em atraso | Saldo das competências cujo vencimento já passou |

Também exibe um gráfico dos últimos seis meses, separando contribuições recorrentes e pontuais; a quantidade de potenciais doadores por etapa; as contribuições mais recentes; e ações de reengajamento pendentes. Há atalhos para registrar uma doação, abrir o funil, consultar recebimentos e acessar a ficha de um contato.

**Na apresentação:** destaque que receita prevista é um compromisso mensal, enquanto arrecadação é dinheiro efetivamente registrado como recebido. Mostre como os indicadores ajudam a escolher as prioridades da equipe.

## 5. Funil de captação

**Objetivo:** visualizar o avanço dos contatos que ainda não são doadores.

O funil organiza os potenciais doadores em quatro etapas:

| Etapa | Interpretação para o atendimento |
| --- | --- |
| Aprendizado e descoberta | O contato começa a conhecer a instituição e sua atuação |
| Reconhecimento do problema | O contato compreende as necessidades atendidas pelas obras sociais |
| Consideração da solução | O contato avalia como pode apoiar a instituição |
| Decisão de doação | O contato está na fase de decidir sua contribuição |

As etapas são apresentadas em um quadro de cartões, com alternativa de visualização em **Lista**. Cada cartão identifica o contato, sua origem e o funil. A ficha pode ser aberta pelo nome do contato.

É possível movimentar um cartão por arraste ou utilizar o botão de mover etapa. O formulário de movimentação permite acrescentar uma anotação. A mudança fica registrada com data e responsável no histórico do contato.

A busca e os filtros permitem localizar contatos por origem, operador responsável, mês de cadastro e funil **Inbound** ou **Outbound**. Inbound representa contatos que chegam à instituição; Outbound organiza a prospecção ativa. No celular, os botões de etapa permitem alternar a coluna exibida.

**Na apresentação:** localize um contato, abra sua ficha, mova-o para outra etapa e mostre o registro na linha do tempo. Em seguida, alterne entre quadro e lista.

## 6. Contatos

**Objetivo:** reunir a base de pessoas e empresas com as quais a instituição mantém relacionamento.

A tela possui abas de **Todos os contatos**, **Potenciais doadores** e **Doadores**. A tabela mostra nome e canal de contato, origem, funil, etapa ou compromisso de contribuição, status e responsável.

As funcionalidades incluem busca por nome, e-mail, telefone ou documento; filtros de origem, responsável e status; paginação; abertura da ficha; cadastro de contato; exportação CSV; e seleção de destinatários para redigir e-mail. A exportação respeita a aba e os filtros aplicados.

### 6.1. Cadastro e edição de contato

O formulário é dividido em duas etapas:

| Etapa | Informações |
| --- | --- |
| Conhecer a pessoa | Nome ou razão social, tipo PF/PJ, e-mail, telefone/WhatsApp e CPF/CNPJ opcional |
| Origem e relacionamento | Canal de origem, funil, etapa inicial e operador responsável, quando preenchido pelo Administrador |

As origens disponíveis são Instagram, Site, Indicação, E-mail, Evento e WhatsApp.

O nome é obrigatório, assim como pelo menos um e-mail ou telefone. O sistema valida o formato do e-mail, o telefone com DDD e os dígitos verificadores do CPF/CNPJ informado. Também bloqueia duplicidade de e-mail ou documento. Telefone e documento recebem máscaras para facilitar o preenchimento.

A edição utiliza o mesmo fluxo e registra a atualização no histórico.

**Na apresentação:** cadastre uma pessoa fictícia, atribua uma origem e mostre a ficha aberta após salvar.

### 6.2. E-mail por seleção de contatos

É possível selecionar destinatários na tabela, inclusive em páginas diferentes, e clicar em **Redigir e-mail**. O editor também pode ser aberto sem seleção prévia, permitindo escolher os destinatários dentro dele.

O editor oferece assunto, mensagem, busca por nome ou e-mail, seleção de todos os resultados disponíveis, contador de destinatários e limpeza da seleção. Contatos sem e-mail válido ou descadastrados não podem ser selecionados.

Antes de confirmar, uma janela apresenta o texto e a relação de destinatários. O usuário pode voltar e editar ou confirmar o envio simulado. A confirmação registra a mensagem no histórico de cada destinatário e na relação de campanhas.

**Na apresentação:** selecione dois contatos, redija uma mensagem curta e mostre a revisão antes de confirmar.

## 7. Ficha de relacionamento e ações complementares

**Objetivo:** centralizar as informações e a história de cada contato em um único lugar.

A ficha é aberta pelo nome ou botão de acesso do contato. Exibe dados cadastrais, origem, funil, responsável, data de cadastro, etapa atual, situação e, para doadores, modalidade, valor e vencimento. A linha do tempo apresenta eventos com detalhes, data e responsável. Para doadores com recebimentos, há um resumo das contribuições e atalhos aos recibos.

### 7.1. Registrar interação

Permite registrar um atendimento por **Telefone**, **WhatsApp**, **Reunião** ou **E-mail**, informando data e hora e um resumo da conversa. Datas futuras são bloqueadas. O registro identifica o operador e passa a integrar a linha do tempo.

As anotações não possuem ação de edição ou remoção na interface, preservando a história do relacionamento. O canal WhatsApp identifica uma interação registrada manualmente; não há envio de mensagens por integração.

### 7.2. Registrar resposta

Permite documentar o conteúdo de uma resposta de e-mail e classificá-la como **Positiva**, **Negativa** ou **Pedido de descadastro**. O registro é manual.

O pedido de descadastro bloqueia o contato nos próximos envios de e-mail. O cadastro e seu histórico continuam disponíveis.

### 7.3. Converter em doador

Para um potencial doador, a ação solicita modalidade **Pontual** ou **Recorrente** e valor compromissado maior que zero. Na modalidade recorrente, também solicita o dia do vencimento mensal, entre 1 e 28.

Ao confirmar, o contato passa a ter status Ativo, é colocado na etapa Decisão de doação e recebe um comprovante de adesão. A conversão é registrada no histórico.

**Atenção ao apresentar:** a adesão registra o compromisso do doador. O recebimento financeiro é registrado em uma operação posterior.

### 7.4. Comprovante de adesão

Exibe identificação do doador, valor compromissado, modalidade, mês de adesão, vencimento e situação. Pode ser impresso ou salvo em PDF pela função de impressão do navegador. O próprio documento esclarece que não confirma pagamento.

### 7.5. Alterar status do doador

Solicita novo status, data do evento e motivo. A data não pode ser futura. A alteração preserva o histórico e identifica o responsável.

### 7.6. Enviar mensagem individual

Para contatos com e-mail e sem descadastro, permite redigir assunto e mensagem, revisar e confirmar o envio simulado. A mensagem é registrada na linha do tempo.

### 7.7. Excluir contato

Disponível somente para o Administrador, exige confirmação. Se houver histórico financeiro, a exclusão é bloqueada para preservar os recebimentos. A interface orienta usar o status Cancelado para encerrar a recorrência.

**Na apresentação:** use a ficha como ponto central da história: registre uma conversa, mova a etapa, converta o contato e abra o comprovante de adesão.

## 8. Doadores

**Objetivo:** acompanhar pessoas e empresas que já possuem um compromisso de contribuição.

A tela apresenta os doadores com valor compromissado, modalidade, status, origem e responsável. Possui busca, filtros de origem, responsável e status, exportação CSV, abertura da ficha e recursos de seleção e composição de e-mail. O botão **Novo contato** inicia um cadastro; a adesão como doador acontece pela conversão na ficha.

| Status | Significado no protótipo |
| --- | --- |
| Ativo | Doador com adesão ativa |
| Inadimplente | Situação que exige acompanhamento dos recebimentos em atraso |
| Pausado | Contribuição suspensa por alteração manual de status |
| Cancelado | Adesão encerrada por alteração manual de status |

Para recorrentes ativos, dois meses anteriores consecutivos sem nenhum pagamento registrado nas respectivas competências levam à identificação automática de inadimplência e à criação de uma ação de reengajamento. Essa verificação ocorre ao abrir ou entrar na aplicação.

Pagamentos parciais deixam saldo pendente; a regra automática dos dois meses considera ausência de pagamento, e não apenas saldo em aberto. Um doador inadimplente retorna automaticamente a Ativo quando um lançamento quita todas as suas pendências vencidas.

Enquanto estiverem Pausados ou Cancelados, os doadores não aparecem na geração de pendências. A pausa não é aplicada automaticamente pela regra de inadimplência.

**Na apresentação:** filtre os inadimplentes, abra uma ficha e explique o uso do motivo na alteração de status.

## 9. Listas e campanhas

**Objetivo:** organizar públicos para prospecção e comunicação com a comunidade.

A tela exibe cartões das listas, com nome, categoria, descrição e quantidade de contatos. Possui busca por nome ou categoria, criação de lista e criação de campanha. A seção de campanhas realizadas apresenta assunto, número de destinatários, data e acesso à mensagem registrada.

### 9.1. Criar, editar e abrir uma lista

O cadastro solicita nome, categoria e descrição opcional. Ao abrir uma lista, é possível editar suas informações, adicionar contatos já existentes, importar contatos e criar uma campanha. A relação de integrantes indica a situação de envio.

É possível remover um integrante da lista sem excluir seu cadastro do CRM.

### 9.2. Importar CSV ou Excel

A importação aceita arquivos **CSV** e **Excel .xlsx**, com colunas **nome**, **email** e, opcionalmente, **telefone**. A interface oferece um modelo CSV.

Arquivos podem ter até 5 MB e conter até 10.000 contatos. No Excel, é utilizada a primeira planilha; o formato antigo .xls deve ser convertido para .xlsx ou CSV.

Contatos com nome ou e-mail inválido são descartados. E-mails já cadastrados são tratados como duplicados e não são importados novamente. Para associar um cadastro existente à lista, utilize **Adicionar contatos**.

Os novos contatos importados são cadastrados como pessoa física, origem E-mail, funil Outbound e etapa Aprendizado e descoberta, sob responsabilidade do usuário que fez a importação. Esses dados podem ser ajustados na ficha.

O resultado mostra quantidades importadas, duplicadas e inválidas, além de detalhes das linhas descartadas na última importação.

### 9.3. Criar e consultar uma campanha

O usuário escolhe a lista, informa assunto e mensagem e revisa o conteúdo antes da confirmação. Contatos descadastrados e sem e-mail ficam fora do envio; o registro final considera apenas e-mails válidos.

Após a confirmação, a campanha fica disponível para consulta, com mensagem e destinatários, e cada contato recebe um evento na linha do tempo. O envio de e-mail é simulado.

**Na apresentação:** abra uma lista, mostre seus integrantes e prepare uma campanha. Destaque a revisão e o tratamento dos contatos descadastrados.

## 10. Doações e pendências

**Objetivo:** controlar as contribuições financeiras recebidas e os saldos mensais dos doadores recorrentes.

A tela apresenta indicadores de recebimentos do mês, valores recorrentes e pontuais e saldo pendente. As abas **Recebimentos** e **Pendências mensais** separam os lançamentos já registrados das competências ainda abertas. Os indicadores são gerais; os filtros atuam sobre as relações exibidas nas abas.

### 10.1. Recebimentos

Permite consultar contribuições, buscar por doador, filtrar por mês de pagamento e modalidade, abrir recibos e exportar os lançamentos em CSV. Cada lançamento está vinculado a um doador.

### 10.2. Registrar doação

O formulário possui duas etapas. Na primeira, são informados doador, valor recebido, data do pagamento, competência mensal para recorrentes e destinação do recurso. Na segunda, são informados a referência Pix e/ou um comprovante.

As destinações disponíveis são **Obras sociais**, **Sopa Fraterna**, **Reforço de Luz** e **Escola Esperança**.

O sistema aceita apenas valores financeiros em reais maiores que zero. A data do pagamento não pode ser futura. Para recorrentes, a competência não pode ser anterior à adesão. É obrigatório informar uma referência Pix ou anexar um comprovante PNG, JPG ou PDF de até 2 MB. Uma referência Pix já lançada é bloqueada.

Ao confirmar, o recebimento é registrado, um recibo é gerado, o histórico é atualizado e o valor passa a compor os indicadores financeiros.

**Na apresentação:** use o contato recém-convertido, registre uma contribuição fictícia e mostre o recibo. Explique que o operador confirma manualmente o recebimento; não há consulta bancária ou processamento de Pix.

### 10.3. Pendências mensais e baixa

A relação apresenta doador, competência, vencimento, saldo a receber e situação **A vencer** ou **Em atraso**. É possível buscar por doador, filtrar por competência, mostrar somente atrasos e exportar CSV.

O botão **Dar baixa** abre o registro de doação com doador, competência e saldo preenchidos. Um pagamento parcial reduz o saldo; a quitação elimina a pendência daquela competência.

**Exemplo:** para um compromisso mensal de R$ 100, um recebimento de R$ 40 deixa R$ 60 pendentes. Um segundo recebimento de R$ 60 para a mesma competência encerra a pendência.

**Na apresentação:** destaque a diferença entre a data do pagamento e a competência. Um recebimento feito neste mês pode quitar um compromisso de um mês anterior.

### 10.4. Recibo de contribuição

Exibe número do recibo, doador, valor, data do pagamento, competência, modalidade, destinação, referência Pix e responsável pelo registro. Quando existe anexo, permite baixar o comprovante.

O recibo pode ser impresso ou salvo em PDF pelo navegador e identifica que foi emitido no ambiente de demonstração com dados fictícios.

## 11. Relatórios

**Objetivo:** apoiar o Administrador na análise dos resultados financeiros e da captação.

Os filtros incluem mês de análise, modalidade de contribuição e etapa do funil. A tela apresenta total arrecadado, valores recorrentes, valores pontuais, conversão em doadores, distribuição por destinação, conversão em cada etapa e contribuições do período.

Os valores financeiros são calculados sobre recebimentos registrados. A conversão considera o grupo de contatos cadastrados no mês escolhido e sua evolução registrada, incluindo o histórico de movimentações entre etapas. Ao usar o filtro de modalidade, a seleção atua sobre os recebimentos; os indicadores de conversão continuam baseados no grupo de contatos do período.

O botão **Exportar relatório** gera um CSV dos lançamentos financeiros correspondentes aos filtros, com dados como doador, valor, data, competência, destinação, Pix e operador. Os gráficos e indicadores não são exportados como um relatório diagramado.

**Na apresentação:** escolha um mês, mostre a distribuição dos recursos e explique como a instituição pode acompanhar o desempenho da captação.

## 12. Usuários e acessos

**Objetivo:** permitir ao Administrador gerenciar quem pode utilizar o CRM.

A tabela apresenta nome, e-mail, perfil e status de cada usuário. É possível cadastrar um acesso, editar dados, alterar o perfil, definir uma nova senha e ativar ou inativar o usuário.

O formulário solicita nome, e-mail, perfil, status e senha inicial; na edição, uma nova senha é opcional. A senha deve ter pelo menos oito caracteres, e o e-mail de acesso não pode estar duplicado.

O sistema impede que o Administrador remova seu próprio acesso administrativo e que o último Administrador ativo seja inativado ou perca o perfil. Usuários inativos não conseguem entrar.

**Na apresentação:** abra o cadastro de um operador e mostre as opções de perfil e status. Depois, entre com a conta Operador para demonstrar os menus disponíveis.

## 13. Histórico de auditoria

**Objetivo:** permitir ao Administrador consultar as ações realizadas na aplicação e seus responsáveis.

A tabela apresenta data e hora, responsável, ação e detalhes. A busca permite localizar registros pelo responsável, pela ação ou pelos detalhes. A interface exibe até 100 registros correspondentes à busca.

São registrados eventos como acesso e saída do sistema, cadastro e atualização de contatos, movimentações de etapa, conversão em doador, recebimentos, campanhas, importações e alterações de usuários. Eventos associados a um contato também aparecem em sua ficha.

**Na apresentação:** procure o contato criado durante a demonstração ou uma ação de doação. Mostre como a equipe consegue identificar o que aconteceu e quem realizou a operação.

## 14. Ações de relacionamento

**Objetivo:** lembrar a equipe dos doadores que precisam de reengajamento.

O ícone de sino abre a janela **Cultivar nossos relacionamentos**, com ações pendentes geradas pela identificação de inadimplência. Cada item permite abrir a ficha ou marcar a ação como concluída. A conclusão fica registrada na auditoria.

O Administrador também vê parte dessas ações na Visão geral. Concluir uma ação indica que o acompanhamento foi feito; a quitação das pendências é realizada pelos lançamentos financeiros.

**Na apresentação:** abra uma ação pendente e a ficha do doador para conectar o controle financeiro ao cuidado com o relacionamento.

## 15. Experiência de uso

A identidade visual utiliza a marca institucional, tons de verde e dourado e linguagem acolhedora. A organização prioriza ações diretas na ficha, formulários divididos em etapas e identificação clara de status.

A interface se adapta a computadores, tablets e celulares. O quadro do funil possui alternativa em lista, botões de movimentação e seleção de etapa no celular. Formulários têm rótulos, mensagens de validação e suporte à navegação por teclado.

**Na apresentação:** reduza a largura da janela para mostrar a adaptação do menu e do funil.

## 16. Roteiro sugerido para apresentar em 25 a 30 minutos

| Tempo aproximado | Percurso | Mensagem principal |
| --- | --- | --- |
| 2 minutos | Contexto e entrada como Administrador | O CRM acompanha a jornada do contato à contribuição |
| 3 minutos | Visão geral | A gestão acompanha resultados e prioridades |
| 5 minutos | Contatos, cadastro e ficha | A equipe centraliza dados e preserva o relacionamento |
| 3 minutos | Funil e movimentação | Cada contato tem uma etapa de acompanhamento |
| 3 minutos | Conversão e comprovante de adesão | A adesão formaliza o compromisso do doador |
| 5 minutos | Doação, recibo e baixa parcial | Recebimentos e pendências são controlados por competência |
| 3 minutos | Listas, campanha e revisão | A comunicação utiliza públicos organizados |
| 3 minutos | Relatórios, auditoria e perfil Operador | A gestão analisa resultados e define acessos |
| 2 minutos | Limites do protótipo e validação | O cliente confirma os fluxos e as regras antes da evolução |

Para manter a apresentação conectada, utilize um único contato fictício no percurso principal. Deixe importação, descadastro, recuperação de senha e alterações de status como demonstrações complementares, conforme o interesse do cliente.

**Sugestão de encerramento:** “Vimos como o CRM conecta a captação, o relacionamento e o registro das contribuições. Agora podemos validar se essas etapas, informações e regras atendem à rotina da instituição e apontar os ajustes necessários.”

## 17. Preparação da demonstração

1. Na pasta do projeto, execute `node server.js` e abra `http://localhost:3000`.
2. Entre como Administrador e confira se os dados demonstrativos estão disponíveis.
3. Prepare um nome fictício e um e-mail ainda não cadastrado para o contato da apresentação.
4. Para registrar uma doação, use uma referência Pix fictícia e única, como `PIX-DEMO-APRESENTACAO-001`.
5. Se apresentar importação, baixe o modelo CSV pela própria interface e preencha com contatos fictícios e e-mails únicos.
6. Confira a função de impressão do navegador caso queira demonstrar recibos e comprovantes em PDF.
7. Reserve uma pendência existente para mostrar uma baixa parcial e sua quitação.

O protótipo começa com 24 contatos fictícios e contribuições ajustadas ao mês atual. Por isso, os valores e as datas exibidos podem variar conforme o dia da apresentação e as alterações realizadas.

As mudanças ficam salvas apenas no navegador utilizado. Para reiniciar a demonstração, limpe o armazenamento do endereço do protótipo nas ferramentas do navegador e recarregue a página. Isso apaga as alterações locais da demonstração.

## 18. Alcance do protótipo

| Recurso | Comportamento atual |
| --- | --- |
| Cadastros, funil, histórico e regras financeiras | Funcionam no navegador para validação dos fluxos |
| Persistência | Local ao navegador, sem banco de dados central compartilhado entre computadores |
| Campanhas e mensagens individuais | Registram o envio no histórico; nenhum e-mail real é enviado |
| Respostas de e-mail | São registradas manualmente, sem leitura automática de uma caixa de entrada |
| Recuperação de acesso | Apresenta a mensagem e o link dentro da aplicação |
| Pix | Referência ou comprovante informado pelo operador, sem integração bancária |
| WhatsApp | Canal de interação anotado manualmente, sem integração de envio |
| Recibos e comprovantes de adesão | Impressão ou PDF pelo navegador, com dados demonstrativos |
| Recorrência automática | Verificação ao abrir ou entrar na aplicação, sem rotina agendada em segundo plano |
| Permissões, autenticação e auditoria | Recursos locais de demonstração; precisam de estrutura de produção para uso real |
| Comprovantes anexados | Armazenados localmente, sujeitos ao limite de espaço do navegador |
| Tipos de doação | Contribuições financeiras em reais; não há cadastro de bens ou itens físicos |

Use dados fictícios durante a demonstração. O protótipo serve para validar a experiência e as regras; a operação com dados reais depende da implementação da estrutura de produção e das integrações acordadas.

## 19. Pontos para validar com o cliente

- As quatro etapas do funil representam o processo de captação da instituição?
- Os canais de origem, as destinações e os campos cadastrais atendem à rotina?
- A divisão de acesso entre Administrador e Operador está adequada?
- A regra de dois meses sem pagamento e os estados Pausado e Cancelado correspondem à política desejada?
- A baixa parcial e a distinção entre pagamento e competência estão claras?
- O conteúdo dos comprovantes de adesão e dos recibos atende à necessidade institucional?
- Os filtros, relatórios e exportações oferecem as informações necessárias para a gestão?
- Quais integrações serão prioritárias na versão de produção?

---

Documento elaborado a partir das telas, dos fluxos e das regras presentes em `app.js`, `domain.js` e `README.md`. Descreve o comportamento implementado no protótipo, sem pressupor integrações futuras.
