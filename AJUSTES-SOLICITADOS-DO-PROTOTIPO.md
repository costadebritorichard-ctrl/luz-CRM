# CRM Luz da Esperança — Especificação dos ajustes solicitados

**Data de elaboração:** 18 de outubro de 2026.  
**Última revisão documental:** 19 de outubro de 2026.  
**Fonte:** duas listas de anotações fornecidas pelo solicitante, incluindo mensagem de Enzo datada de 6 de outubro de 2026.  
**Situação:** AJ-01 a AJ-09 implementados no protótipo. AJ-04 a AJ-09 usam as decisões de demonstração descritas abaixo; integrações externas e políticas definitivas de produção permanecem fora do escopo.  
**Base examinada:** `README.md`, `APRESENTACAO-DO-PROTOTIPO.md`, `app.js` e `domain.js` do protótipo atual.

## 1. Objetivo e interpretação das anotações

Este documento consolida os pedidos repetidos e descreve as telas, os fluxos, as regras e os critérios de aceite dos ajustes implementados e dos ainda previstos. A revisão documental não representa implementação de funcionalidades. Os pedidos associados ao Operador também devem estar disponíveis ao Administrador, que já possui acesso às rotinas operacionais. A exportação de relatórios permanece administrativa.

As anotações não definem todas as regras de negócio. Por isso, o documento diferencia **pedido explícito**, que consta das mensagens, de **proposta para validação**, que resolve uma lacuna sem apresentá-la como decisão já tomada. As propostas pendentes estão reunidas na seção 12.

| ID | Ajuste consolidado | Área principal |
| --- | --- | --- |
| AJ-01 | Criar saída da cadência principal e funil paralelo de perdas, com motivos | Funil e ficha do contato |
| AJ-02 | Rever a classificação Inbound/Outbound por origem | Cadastro e ficha do contato |
| AJ-03 | Automatizar e-mails além da redação manual | Comunicação e campanhas |
| AJ-04 | Automatizar o tratamento após cadastro Inbound, conforme a origem | Cadastro e acompanhamento |
| AJ-05 | Incluir o status de doador Suspenso | Doadores e recorrência |
| AJ-06 | Selecionar todos e segmentar contatos em Adicionar à nossa rede | Listas e campanhas |
| AJ-07 | Identificar doadores zerados com alerta e tag Sócio Inscrito | Doadores e ficha |
| AJ-08 | Permitir envio de recibo por e-mail | Recibos e recebimentos |
| AJ-09 | Exportar relatórios em PDF e CSV | Relatórios administrativos |

## 2. AJ-01 — Saída da cadência principal e funil de perdas

**Definições confirmadas pelo solicitante:** situação única Fora da cadência; visualização em funil de perdas; motivos Sem interesse, Sem disponibilidade financeira, Sem retorno, Momento inadequado e Outros; abrangência de potenciais doadores e de pessoas que já eram doadoras e pararam de contribuir.

**Implementação:** Funil de perdas possui tela própria e item específico no menu lateral, disponível para Administrador e Operador. Funil de captação permanece em sua tela, sem seletores para alternar entre os dois funis. O funil de perdas possui cinco etapas próprias: Perda registrada, Em análise, Retomada agendada, Em reaproximação e Encerrado sem retomada. A última etapa de captação fica preservada na ficha, separada da etapa de perdas. Novas perdas e perdas antigas sem etapa definida entram em Perda registrada. Registrar perda fica disponível somente na ficha do relacionamento, inclusive para doadores. Os cards de captação mantêm a apresentação compacta original; clicar no card abre a ficha com essa opção. A alternativa em lista também acessa a ação pela ficha. Outros exige explicação; Sem retorno é informado manualmente, sem prazo ou classificação automática. A data deve estar entre o cadastro e o dia atual.

A movimentação entre etapas de perdas é feita na ficha, pela ação Mover etapa de perdas, com observação opcional e histórico de responsável e data. Retomada agendada exige data a partir de hoje; o agendamento registra o acompanhamento, sem enviar mensagens automaticamente. Encerrado sem retomada permanece consultável e permite reabertura manual. Retomar cadência remove o contato do funil de perdas e solicita etapa de captação e motivo, sem alterar automaticamente o status financeiro.

Os cards do Funil de perdas são compactos, com nome, avatar e origem/direção. Clicar no card abre a ficha com motivo, observação, data, responsável e a ação de retomada. O card também pode ser acionado pelo teclado.

O funil de perdas permite filtrar por motivo, origem, direção, responsável e mês da saída. A retomada exige etapa e motivo; doadores retomados também aparecem na cadência principal. Cada episódio permanece no histórico, com responsável e datas. Status financeiro, pagamentos, pendências e listas são preservados. A etapa Consideração da solução permanece existente.

**Integração com AJ-03:** a saída cancela mensagens pendentes de boas-vindas e acompanhamento de etapa. A retomada gera um novo evento de entrada em etapa, sem recuperar envios cancelados. Agradecimentos continuam vinculados às contribuições, mesmo fora da cadência, respeitando e-mail válido e descadastro. Envios manuais existentes continuam disponíveis.

**Pedido explícito:** oferecer um local fora da cadência principal, descrito como “saída de cadência”, e um funil paralelo para perdas, registrando por que a pessoa não doou.

**Situação atual:** o funil de captação possui quatro etapas: Aprendizado e descoberta, Reconhecimento do problema, Consideração da solução e Decisão de doação. Inbound e Outbound representam a classificação do relacionamento. O Funil de perdas já possui tela e etapas próprias, conforme a implementação descrita acima.

### Comportamento especificado

1. Disponibilizar na ficha do contato uma ação para retirar o relacionamento da cadência principal. Clicar no card abre essa ficha; não exibir o botão Registrar perda diretamente nos cards nem na lista de captação.
2. Solicitar motivo da saída, observação complementar e data. Registrar automaticamente o responsável e o instante do registro.
3. Para uma perda confirmada, apresentar o contato na tela **Funil de perdas**, com situação **Fora da cadência**. Removê-lo do acompanhamento ativo da cadência principal sem excluir o cadastro.
4. Preservar a origem, a classificação Inbound/Outbound, a última etapa, as interações, as listas e todo o histórico financeiro que eventualmente exista.
5. Exibir motivo, data de saída, última etapa e responsável na ficha; permitir consultar e filtrar as perdas por motivo, origem, direção e período da saída.
6. Permitir retomada manual, com escolha da etapa e registro do motivo da reentrada. Preservar cada episódio de saída e retorno no histórico.
7. Interromper as automações da cadência principal após a saída. Uma sequência específica de reengajamento só deve executar se houver regra própria habilitada.

**Motivos aprovados:** Sem interesse, Sem disponibilidade financeira, Sem retorno, Momento inadequado e Outros. Em Outros, exigir explicação. Sem retorno é marcado manualmente pelo operador.

**Etapas e situação:** preservar Consideração da solução. Saída temporária e perda usam a mesma situação Fora da cadência, sempre com motivo e possibilidade de retomada.

Uma perda de captação não deve alterar automaticamente o status financeiro de um doador. Se o fluxo também contemplar doadores que deixaram de contribuir, registrar separadamente a perda de relacionamento e a mudança do vínculo de doação.

**Critérios de aceite:** não concluir uma perda sem motivo; retirar o contato apenas da cadência ativa; manter o cadastro e o histórico; permitir consultar a razão de não doação e retornar à cadência; não disparar e-mails da sequência anterior após a saída.

## 3. AJ-02 — Origem e classificação Inbound/Outbound

**Pedido explícito:** verificar a classificação de Site como Inbound e de WhatsApp como Inbound ou Outbound.

**Situação atual:** os campos usam os rótulos Origem e Classificação. Site e Instagram preenchem e bloqueiam Inbound; WhatsApp admite Inbound ou Outbound conforme quem iniciou o relacionamento. As demais origens mantêm classificação manual.

### Comportamento especificado

| Origem / contexto | Classificação esperada |
| --- | --- |
| Site: pessoa preenche formulário ou procura a instituição | Inbound |
| Instagram | Inbound (regra definida pelo solicitante) |
| WhatsApp: pessoa inicia a conversa com a instituição | Inbound |
| WhatsApp: equipe inicia a abordagem de captação | Outbound |
| Outras origens existentes | Manter disponíveis; definir orientação específica antes de automatizar |

Ao escolher Site ou Instagram, preencher Inbound automaticamente. Para WhatsApp, solicitar ou permitir indicar quem iniciou o relacionamento, com as opções Inbound e Outbound. Os campos usam os rótulos Origem e Classificação, sem descrições auxiliares. A direção representa a origem do relacionamento: uma resposta da equipe a um contato Inbound não o transforma em Outbound.

Manter canal, direção e situação na cadência como informações distintas. Um contato pode, por exemplo, ter origem Site, direção Inbound e situação Fora da cadência. O funil de perdas não deve apagar sua direção original.

**Regra confirmada e implementada:** Site e Instagram são sempre Inbound, sem exceções. Ao selecionar Site ou Instagram, a direção é preenchida e bloqueada em Inbound; a validação de domínio também impede Site + Outbound e Instagram + Outbound. No WhatsApp, o campo informa quem iniciou o relacionamento e armazena Inbound ou Outbound conforme a escolha. Outras origens mantêm escolha manual. Não exibir alerta de revisão de origem na ficha nem nas tabelas; a validação impede novos cadastros incompatíveis. Para cadastros antigos preservados, ao editar, a correção é aplicada somente ao salvar, com origem e direção anteriores e novas no histórico.

**Critérios de aceite:** Site preenche Inbound; WhatsApp admite ambas as direções conforme a iniciativa; a classificação aparece na ficha e nos filtros; perda e retomada preservam essa informação.

## 4. AJ-03 — Automação de e-mails

**Definições confirmadas e implementadas:** Administrador e Operador de Captação podem criar, editar, revisar, ativar, pausar e consultar regras. Foram aprovados os três eventos: cadastro Inbound, entrada em etapa e contribuição registrada; cada regra permite envio imediato ou após intervalo configurável. O envio de recibos fica para AJ-08.

**Tela:** item E-mails no menu, disponível para ambos os perfis, com as abas Envios e recorrências, Automações e Histórico. O antigo item Automações foi removido do menu; suas regras e dados permanecem disponíveis na aba Automações. Há três modelos iniciais pausados: Boas-vindas, Acompanhamento de etapa e Agradecimento por contribuição. A configuração tem duas etapas, com até cinco campos por etapa. Primeiro são definidos nome, evento, origem, classificação e etapa; depois, assunto, mensagem e intervalo em minutos, horas ou dias. Zero significa imediato. O Administrador e o Operador possuem as mesmas ações nessa área. Site e Instagram respeitam a classificação Inbound.

**Ativação e alterações:** regras novas e editadas ficam pausadas para revisão. Revisar e ativar mostra as condições e uma mensagem de exemplo com dados fictícios. A ativação vale apenas para eventos novos, sem envio retroativo à base. Editar ou pausar cancela os envios pendentes daquela regra; ativar novamente não recupera esses envios. Os registros de execução preservam a versão da regra que os gerou.

**Disparos:** salvar um novo contato gera um evento de cadastro e um de entrada na etapa inicial; boas-vindas só se aplicam a Inbound. Alterar ou retomar uma etapa gera um novo evento de etapa; salvar o mesmo estágio sem mudança não repete o evento. Registrar uma contribuição gera agradecimento vinculado ao recebimento. Editar um cadastro não repete boas-vindas. Uma regra pode selecionar todas as origens/etapas ou uma origem/etapa específica. A sequência pode ser composta por regras com intervalos diferentes para o mesmo evento.

**Mensagens:** variáveis disponíveis: `{{nome}}`, `{{origem}}` e `{{etapa}}`; para contribuições também `{{valor}}` e `{{recibo}}`. O número de recibo pode aparecer no texto, mas nenhum recibo ou comprovante é anexado neste ajuste. Variáveis desconhecidas são recusadas ao salvar a regra; dados obrigatórios ausentes causam falha registrada, sem mensagem incompleta.

**Execução e histórico:** os envios imediatos são processados ao salvar; agendados são processados periodicamente durante a sessão e ao reabrir o protótipo. A tela registra Agendada, Processada, Envio simulado, Bloqueada, Falha e Cancelada, com destinatário, evento, regra, configuração, previsão e histórico de transições. Ações automáticas são identificadas como Sistema na ficha e na auditoria. O histórico permite cancelar uma pendência, usar Simular agora em uma execução específica e tentar novamente somente em caso de falha, preservando tentativas anteriores. Cada regra/evento gera no máximo uma execução, inclusive após recarga.

**Revalidação:** no momento do envio, conferir regra ativa, existência do contato, e-mail válido, ausência de descadastro, condições de origem/classificação e etapa pertinente. Boas-vindas e acompanhamento exigem cadência ativa. Mudança de etapa impede uma mensagem atrasada da etapa anterior. Uma saída de cadência cancela as pendências desse fluxo. Falhas de envio não desfazem cadastro ou contribuição.

**Pedido explícito:** automatizar e-mails, indo além de redigir mensagens. A orientação “máximo de automação geral” deve reduzir tarefas repetitivas mediante regras visíveis e controláveis.

**Situação atual:** a tela E-mails centraliza composição, seleção de destinatários, agendamento único, recorrência por calendário, regras por evento e histórico consolidado. Redigir e-mail em Contatos usa o novo editor. As regras de evento e de tratamento pós-cadastro existentes são preservadas. Listas e campanhas mantém sua apresentação anterior, com contador, histórico e editor próprio de campanhas por lista, além da inclusão de participantes do AJ-06.

### Complemento solicitado — envio único ou recorrente para leads selecionados

- Novo e-mail permite escrever assunto e mensagem e escolher Único ou Recorrente. O seletor oferece busca, filtros de vínculo, lista e origem, seleção de todos os resultados e preservação das escolhas ao mudar filtros.
- Único permite envio após confirmação ou em data e hora futuras. Recorrente permite primeiro envio imediato ou agendado, frequência diária, semanal ou mensal e data de término opcional.
- Cada mensagem é salva aguardando revisão e só executa após confirmação explícita. Editar cria nova versão aguardando revisão e interrompe a programação anterior; execuções já registradas preservam seu conteúdo e destinatários efetivos.
- Recorrências podem ser pausadas, retomadas ou canceladas. Retomar preserva o próximo horário ainda futuro ou ignora horários passados. Cancelamento mantém o histórico e exige edição/revisão para programar novamente.
- Os destinatários são os contatos selecionados, sem inclusão automática de novos participantes das listas. E-mail válido e ausência de descadastro são revalidados em cada ocorrência. Nas recorrências, contatos fora da cadência e doadores suspensos ficam bloqueados, com motivo individual.
- Frequências seguem o calendário e horário local do navegador. Meses sem o dia original usam o último dia do mês; o mês seguinte volta a usar o dia original, quando disponível. A data de término é inclusiva.
- A abertura após vários períodos processa no máximo uma ocorrência pendente por programação e ignora as demais, registrando a quantidade ignorada. Depois do término não processa ocorrências vencidas. Simular próximo envio agora permite demonstrar uma ocorrência sem esperar o prazo.
- Histórico reúne execuções únicas, recorrentes, automações por evento, recibos e campanhas antigas. Resultados mostram destinatários simulados ou bloqueados, configuração, versão e datas; o protótipo não afirma entrega real.

**Critérios de aceite adicionais:** selecionar leads específicos e manter a seleção entre filtros; não enviar antes da ativação ou do agendamento; executar envio único uma vez; calcular recorrências e meses curtos corretamente; pausar e cancelar sem novas execuções; retomar sem recuperar atrasos; preservar histórico após edição e recarga; manter regras e campanhas anteriores acessíveis na nova tela.

### Comportamento especificado

Disponibilizar uma área ou seção de **Automações**, com regras que contenham nome, evento de disparo, condições, modelo de mensagem, momento de execução e situação habilitada/desabilitada. Permitir visualizar a regra antes de ativá-la e consultar seu histórico de execuções.

O sistema deve preencher as variáveis previstas no modelo, como nome do contato, e executar o envio quando o evento e as condições forem atendidos, sem exigir nova redação a cada contato. Modelos com campos obrigatórios ausentes não devem gerar mensagens incompletas.

**Regras aprovadas:**

| Evento / controle | Condição | Ação implementada |
| --- | --- | --- |
| Cadastro confirmado | Inbound, origem habilitada e e-mail elegível | Enviar boas-vindas |
| Entrada em etapa | Contato em cadência ativa e regra habilitada | Iniciar a mensagem ou sequência da etapa |
| Contribuição registrada | Recebimento registrado e regra habilitada | Enviar agradecimento; envio de recibo será tratado em AJ-08 |
| Saída de cadência | Contato retirado do fluxo principal | Cancelar mensagens futuras da sequência principal |

Saída de cadência é um controle de cancelamento integrado ao AJ-01; não é um quarto evento configurável em E-mails → Automações.

### Controles necessários

- Validar o e-mail e respeitar o descadastro nas comunicações de campanha e relacionamento.
- Evitar execução duplicada para o mesmo evento, contato e regra, inclusive após recarregar a aplicação.
- Reavaliar a elegibilidade no momento do envio, pois o contato pode ter saído da cadência ou solicitado descadastro após o agendamento.
- Diferenciar mensagem agendada, processada, simulada, bloqueada e com falha. Um registro local não comprova entrega real.
- Registrar regra, destinatário, evento de origem, data/hora, resultado e responsável pela configuração. Identificar ações automáticas como executadas pelo sistema.
- Permitir pausar uma regra e cancelar envios pendentes vinculados a ela. Nova tentativa de uma falha deve preservar o histórico e evitar duplicidades.

**Critérios de aceite:** um evento elegível executa uma regra habilitada uma única vez; regra desabilitada não dispara; mensagens inelegíveis têm bloqueio explicado; o histórico permite entender qual regra gerou cada envio.

**Limite do protótipo:** demonstrar os disparos e seus registros como simulação, coerentemente com o funcionamento atual. Envio real e execução com o navegador fechado exigem serviço de e-mail e processamento no servidor, fora do comportamento estático existente. A simulação deve permitir demonstrar o vencimento de uma ação sem depender de um serviço externo.

## 5. AJ-04 — Automação após cadastro Inbound

**Pedido explícito:** automatizar o fluxo após o cadastro conforme a origem, especialmente para entradas Inbound. “Inbout” foi interpretado como Inbound.

**Implementação no protótipo:** E-mails → Automações inclui Tratamento pós-cadastro, com criação e edição em duas etapas, revisão, ativação e pausa. A regra define combinação exata de origem/classificação, etapa inicial opcional, responsável fixo, lista e tarefa com prazo de zero a 365 dias. Apenas uma regra operacional pode estar ativa por combinação. Operador atribui a si mesmo ou preserva o responsável do cadastro; Administrador pode escolher outro acesso ativo. A ficha mostra os resultados, a versão e o autor da regra e permite recuperar ações com falha. Boas-vindas e eventos da etapa definitiva reutilizam AJ-03. Não há aplicação retroativa.

**Escopo demonstrável:** é possível implementar o fluxo no protótipo com persistência local, regras visíveis e comunicações simuladas. A criação local de tarefas, a atribuição de responsável, a inclusão em lista e a definição de etapa alteram os dados do protótipo; apenas a entrega de mensagens é simulada. Integração externa e execução com o navegador fechado ficam fora desse escopo.

### Fluxo especificado

1. Validar os dados e verificar duplicidades pelas regras de cadastro existentes.
2. Confirmar a origem e aplicar a classificação da seção 3.
3. Salvar o contato antes de iniciar qualquer automação.
4. Identificar a regra operacional habilitada para aquela combinação de origem e classificação e aplicar suas ações configuradas. Sem regra aplicável, manter o cadastro e informar que nenhuma ação operacional foi configurada.
5. Definir a etapa inicial definitiva antes de gerar seu evento de entrada. Acionar as mensagens pelo mecanismo existente do AJ-03, evitando gerar boas-vindas ou entrada em etapa duas vezes.
6. Registrar cada ação e apresentar na ficha e no resultado do cadastro: realizada, agendada, bloqueada, com falha ou cancelada. Mensagens devem usar os estados do AJ-03 e indicar explicitamente Envio simulado quando processadas.

### Proposta de configuração para o protótipo

A regra poderá definir etapa inicial, responsável fixo ativo, lista de entrada existente e tarefa de acompanhamento com prazo configurável contado a partir do cadastro. A mensagem de boas-vindas deve ser configurada no AJ-03 e reutilizada pelo fluxo. Esses parâmetros são propostas para implementação, ainda não regras de negócio aprovadas.

- Disponibilizar configuração e consulta para Administrador e Operador de Captação, respeitando as restrições de atribuição de responsável já existentes no cadastro.
- Manter regras novas ou editadas pausadas até revisão e ativação, com aplicação somente a novos cadastros.
- Para evitar conflitos, propor uma única regra operacional ativa por combinação exata de origem e classificação. Várias mensagens do AJ-03 continuam permitidas, pois podem compor uma sequência.
- Campos de ação não configurados preservam os valores escolhidos no cadastro; não criar tarefa ou inclusão em lista implicitamente.
- Validar responsável ativo, existência da lista, etapa e prazo antes de ativar a regra. Se um destino ficar indisponível depois, registrar o bloqueio da ação sem desfazer o contato ou as ações já concluídas.
- Registrar identificadores do contato, evento de cadastro, regra e versão, ação, resultado e data/hora. Identificar o executor como Sistema e preservar quem configurou a regra.
- Impedir repetição por contato, evento, regra e ação, inclusive após recarga ou nova tentativa. Uma tentativa de recuperação deve executar somente ações com falha e preservar o histórico anterior.
- Incluir em lista sem duplicar participantes. Bloqueio de e-mail não deve impedir ações operacionais elegíveis.
- Tarefas ficam visíveis na ficha e no acompanhamento, com responsável, prazo e conclusão. Criar a tarefa é ação realizada; a data futura é seu vencimento, não um envio executado em segundo plano.

Distribuição por rodízio, capacidade da equipe, prazos padrão e eventual mudança das permissões de atribuição dependem de definição específica. Para a demonstração, usar responsável fixo permitido e prazo informado na regra.

Para demonstrar o cenário Site, prever uma entrada de cadastro identificada como Site/Inbound ou uma ação de simulação dessa entrada. As notas não esclarecem se o pedido inclui integrar um formulário externo real. Não presumir integração com site ou API do WhatsApp como parte já definida do ajuste.

Uma edição de cadastro não deve repetir automaticamente a sequência de boas-vindas. Uma duplicidade não pode criar outro contato nem reiniciar a sequência sem uma regra específica. Falha no envio não deve desfazer o cadastro salvo.

### Critérios de aceite

- Cadastro Site ou Instagram recebe Inbound e aplica a regra ativa correspondente; WhatsApp Outbound não recebe boas-vindas Inbound.
- Sem regra ativa, o cadastro permanece salvo e o resultado informa a ausência de ações operacionais aplicáveis.
- Etapa, responsável e lista refletem as ações configuradas; a tarefa apresenta prazo e responsável e pode ser concluída.
- O evento de entrada corresponde à etapa inicial definitiva; boas-vindas usam AJ-03 sem um segundo disparo do mesmo evento/regra.
- Editar, salvar novamente, recarregar ou tentar recuperar uma falha não duplica contatos, tarefas, inclusões em lista ou mensagens.
- Contato duplicado é recusado antes de iniciar ações. E-mail ausente, inválido ou descadastrado bloqueia a mensagem conforme AJ-03, preservando o contato e as demais ações elegíveis.
- Falha de uma ação preserva o cadastro e os resultados das demais; a ficha identifica regra, versão, ação, responsável pela configuração, executor, data e resultado.
- Dados antigos não recebem ações retroativas. A demonstração Site/Inbound funciona sem formulário externo, API ou serviço de e-mail.

## 6. AJ-05 — Status de doador Suspenso

**Pedido explícito:** acrescentar **Suspenso** aos status de doador.

**Situação atual:** existem Ativo, Inadimplente, Pausado, Suspenso e Cancelado. Suspenso está disponível na alteração de status, nos filtros, na ficha, na segmentação e na exportação de contatos. A geração de pendências mantém o comportamento anterior de Pausado e Cancelado e trata Suspenso por intervalos de datas, preservando os débitos anteriores. A inadimplência não é gerada por competências suspensas.

**Política aplicada à demonstração:** a competência é suspensa se seu vencimento estiver entre o início da suspensão (inclusive) e a retomada (exclusive). Se a suspensão ocorrer depois do vencimento, o débito daquela competência permanece. Se a retomada ocorrer no vencimento, a competência volta a ser devida. Não há rateio nem cobrança retroativa do intervalo. Datas válidas e não futuras podem ser informadas desde a adesão, em ordem cronológica das alterações; pagamentos existentes são preservados. Uma suspensão e retomada no mesmo dia formam intervalo vazio. Solicitações automáticas de contribuição são canceladas durante a suspensão; agradecimentos por recebimento permanecem permitidos. Esta política concreta substitui, para a demonstração, as alternativas ainda abertas nos parágrafos de proposta abaixo.

### Comportamento especificado

Incluir Suspenso na alteração de status, nos filtros, nas tabelas, na ficha, na segmentação de listas e nas exportações pertinentes. A alteração deve solicitar motivo e data e preservar o responsável no histórico. Permitir retorno a outro status com novo registro.

**Proposta para validação:** Suspenso representa interrupção temporária determinada pela instituição; Pausado mantém seu significado atual até que a distinção seja confirmada. Não renomear Pausado nem migrar seus registros automaticamente.

**Proposta financeira para validação:** suspender novas competências a partir da data efetiva da suspensão, preservando débitos anteriores e pagamentos. Uma doação avulsa recebida durante a suspensão pode ser registrada sem reativar o doador automaticamente. Na retomada, gerar competências a partir da reativação, sem cobrança retroativa do intervalo suspenso.

Essa proposta exige guardar períodos de suspensão. Apenas adicionar Suspenso à lista de estados ignorados pelo cálculo atual faria as pendências antigas desaparecerem durante a suspensão e poderia recriar cobranças do intervalo ao reativar. O comportamento por competência deve ser definido e implementado de forma explícita.

**Definições financeiras ainda necessárias:** estabelecer o tratamento da competência em que ocorrem suspensão e retomada, inclusive se ambas ocorrerem no mesmo mês; definir se datas retroativas são permitidas e como afetam pendências já calculadas. Não presumir rateio diário, perdão de débitos ou estorno de recebimentos. Períodos não devem se sobrepor, e a retomada deve ser posterior ou igual ao início da suspensão.

Também definir quais comunicações ficam bloqueadas durante a suspensão. A proposta é interromper solicitações de contribuição, mantendo disponível o envio manual de recibos de pagamentos já registrados.

**Critérios de aceite:** Suspenso pode ser escolhido com motivo e data; aparece em todos os filtros pertinentes; pagamentos e histórico permanecem; suspensão e retomada obedecem à política de competências validada; recebimento não reativa Suspenso silenciosamente.

## 7. AJ-06 — Seleção e filtros em Adicionar à nossa rede

**Pedido explícito:** incluir Selecionar Tudo, selecionar doadores do mesmo tipo/status e ampliar filtros, incluindo doações específicas.

**Situação atual:** a janela em Listas e campanhas oferece busca, filtros de vínculo, status, modalidade, Sócio Inscrito, origem/classificação, destinação e datas de pagamento. Selecionar todos os resultados abrange todo o conjunto filtrado, apresentado em lista rolável sem paginação. A seleção permanece ao mudar filtros, informa a quantidade fora do resultado atual e permite limpeza ou desmarcação individual. Cancelar não grava; confirmar inclui sem duplicidades e informa a quantidade efetiva. O status é selecionado individualmente nesta versão.

### Comportamento especificado

Adicionar busca por nome/e-mail e os seguintes filtros, apresentados com rótulos distintos:

| Filtro | Opções / significado |
| --- | --- |
| Vínculo | Todos os contatos, potenciais doadores ou doadores |
| Status de doador | Ativo, Inadimplente, Pausado, Suspenso e Cancelado |
| Modalidade | Recorrente ou Pontual |
| Identificação | Sócio Inscrito / sem contribuição registrada |
| Origem e direção | Canais existentes; Inbound ou Outbound |
| Doação específica | Destinação e período do recebimento; outros critérios dependem de validação |

“Doação específica” não está detalhada nas notas. A proposta mínima é encontrar quem tenha ao menos um recebimento na destinação e no período selecionados, por exemplo Sopa Fraterna em determinado mês. Não confundir valor compromissado com contribuição recebida. Faixa de valor ou campanha específica são extensões a validar.

**Proposta de período:** usar a data do pagamento, com limites inclusivos; se início e fim forem informados, início não pode ser posterior ao fim. Filtrar somente por destinação deve considerar todo o histórico disponível. Um contato com vários recebimentos compatíveis aparece uma única vez. Filtros financeiros ou de status de doador excluem potenciais doadores que não atendam a essas condições.

Filtros diferentes se combinam por **E**. Se um filtro permitir múltiplos status, estes se combinam por **OU**. Exemplo: Ativo ou Suspenso, com doação para Sopa Fraterna no período indicado.

### Regra de seleção em lote

1. Exibir **Selecionar todos os resultados**, informando a quantidade e deixando claro que a ação abrange todas as páginas do resultado filtrado.
2. Sem filtros, a ação seleciona todos os contatos elegíveis ainda ausentes da lista. Com filtros, seleciona todos os resultados desses filtros.
3. Permitir desmarcar contatos individualmente e limpar a seleção. Mostrar estado parcial na caixa de seleção geral.
4. Preservar a seleção ao navegar entre páginas. Ao mudar filtros, preservar escolhas anteriores e mostrar quantos selecionados estão fora do resultado atual.
5. A seleção geral adiciona à seleção os resultados atuais; sua desmarcação remove apenas esses resultados. **Limpar seleção** remove todas as escolhas.
6. Exibir o total selecionado e confirmar a inclusão apenas ao acionar **Adicionar contatos**. Cancelar não altera a lista.
7. Impedir duplicidades, inclusive se um contato já tiver sido incluído entre a abertura da janela e a confirmação. Informar quantos foram efetivamente adicionados.

Pertencer a uma lista não equivale a estar autorizado a receber e-mail. Contatos sem e-mail válido ou descadastrados podem continuar sendo organizados na lista, mas permanecem sujeitos às restrições de envio.

**Critérios de aceite:** selecionar todos sem filtro; selecionar somente Suspensos; selecionar Ativos de uma destinação e período; selecionar resultados de várias páginas; desmarcar um contato; preservar seleção entre filtros; cancelar sem gravar; incluir sem duplicidades.

## 8. AJ-07 — Doadores zerados, alerta e tag Sócio Inscrito

**Pedido explícito:** permitir doadores zerados, com alerta e a tag **Sócio Inscrito**.

**Ambiguidade:** “zerado” pode significar nunca ter contribuído, não ter contribuído no período ou ter compromisso cadastrado de R$ 0,00. As interpretações afetam regras diferentes e não foram distinguidas nas notas.

**Proposta para validação:** considerar Sócio Inscrito a pessoa que aderiu como doador, mas ainda não possui nenhuma contribuição confirmada em todo o histórico. A tag é uma condição calculada, independente do status do vínculo. Assim, pode existir um doador Ativo ou Suspenso com a tag Sócio Inscrito.

### Comportamento sob essa interpretação

- Permitir identificar a adesão mesmo sem registrar uma contribuição no momento do cadastro.
- Exibir **Sócio Inscrito** e o alerta **Nenhuma contribuição registrada** na tabela de doadores e na ficha. Oferecer filtro para esse grupo, inclusive na inclusão em listas.
- Informar data da adesão e tempo sem primeira contribuição, para orientar o acompanhamento.
- Remover a tag e encerrar o alerta quando a primeira contribuição válida for registrada, preservando o histórico de adesão.
- Não aplicar a tag a um simples potencial doador que ainda não aderiu.
- Não aplicar a tag a quem já contribuiu em outro período e apenas está sem pagamento no mês atual.
- Não criar recebimento fictício de R$ 0,00, recibo ou arrecadação para representar a inscrição.
- Não substituir automaticamente Inadimplente por Sócio Inscrito. A ausência de primeira contribuição e a inadimplência são informações diferentes.

**Implementação no protótipo:** Sócio Inscrito é calculado para doadores sem contribuição positiva no histórico, independentemente do status. A tag e o aviso aparecem na tabela e na ficha, com filtros e coluna própria na exportação de contatos. Novas adesões registram data e tempo sem primeira contribuição; registros antigos sem data confiável recebem aviso de indisponibilidade. O primeiro recebimento remove a condição. A adesão continua exigindo compromisso maior que zero, sem criar recebimento fictício. Não há notificação ou tarefa recorrente automática para essa condição.

**Proposta de alerta:** exibir a condição imediatamente após a adesão, sem alerta repetido a cada abertura. Prazo e frequência de tarefas ou notificações de cobrança da primeira contribuição dependem de definição.

O aviso deve permanecer visível enquanto a condição existir; a restrição a repetição refere-se à criação de notificações ou tarefas duplicadas. Em dados antigos sem data de adesão confiável, informar Data de adesão não disponível, sem inventar data ou tempo de espera.

**Critérios de aceite:** adesão sem recebimento exibe tag e alerta; primeiro pagamento remove a condição; antigo doador sem pagamento no mês não recebe a tag; inscrição não gera receita ou recibo; segmentação encontra os sócios inscritos.

## 9. AJ-08 — Enviar recibos por e-mail

**Pedido explícito:** adicionar envio por e-mail ao recibo.

**Situação atual:** o recibo oferece Enviar por e-mail, com edição de destinatário, assunto e mensagem, prévia do documento e confirmação explícita. O histórico preserva os dados do recibo e o destinatário efetivo; a tela de envio mostra o último envio simulado. Reenvios não criam recebimento ou número de recibo. Descadastro bloqueia o envio mesmo com destinatário alternativo. Impressão/PDF permanece disponível.

**Limite da demonstração:** o anexo PDF é representado na prévia, sem gerar ou transmitir arquivo pelo fluxo de e-mail. O resultado é identificado como envio simulado; o comprovante Pix não é incluído. A impressão do recibo continua permitindo salvar o documento como PDF pelo navegador.

### Comportamento especificado

1. Acrescentar **Enviar por e-mail** junto às ações do recibo, mantendo impressão e PDF.
2. Abrir uma revisão com destinatário preenchido pelo cadastro, assunto, mensagem e identificação do recibo. Permitir revisar o endereço antes de confirmar, sem alterar silenciosamente o cadastro.
3. Apresentar o documento que será enviado, com o mesmo número, doador, valor, data, competência, modalidade e destinação do recibo existente.
4. Confirmar o envio e registrar recibo, destinatário efetivo, data/hora, responsável e resultado no histórico. No protótipo, identificar explicitamente o envio como simulado.
5. Se o e-mail estiver ausente ou inválido, explicar o impedimento e permitir informar um endereço válido antes de prosseguir.
6. Permitir reenvio intencional, mostrando o último envio. Reenviar o mesmo documento, sem gerar outro recebimento ou outro número de recibo.

**Proposta para validação:** representar o recibo como PDF anexo na experiência de envio. Confirmar se a entrega definitiva será por anexo ou link. O comprovante Pix anexado ao recebimento não deve ser incluído automaticamente: ele é um documento diferente do recibo institucional.

O envio automático após a contribuição pode integrar AJ-03 se a regra estiver habilitada; o pedido de botão manual deve funcionar independentemente dessa automação.

**Política a definir:** o bloqueio atual por descadastro é usado no envio de campanhas. Até haver política específica para recibos transacionais, não contornar silenciosamente esse bloqueio. Informar o impedimento; manter a obtenção do recibo por impressão/PDF.

O bloqueio acompanha o contato mesmo que o destinatário seja alterado na revisão. O histórico deve preservar os dados do documento e o endereço efetivamente usado no envio simulado. Falha ou cancelamento não podem ser apresentados como envio concluído. A representação de PDF anexo na simulação deve indicar se nenhum arquivo foi efetivamente gerado ou transmitido.

**Critérios de aceite:** envio manual a endereço válido; orientação para e-mail ausente ou inválido; registro vinculado ao recibo correto; reenvio sem duplicar lançamento; conteúdo consistente com a versão impressa; resultado simulado claramente identificado.

## 10. AJ-09 — Relatórios em PDF e CSV

**Pedido explícito:** permitir ao Administrador exportar relatórios em PDF e CSV, pois atualmente só há CSV.

**Situação atual:** Relatórios oferece Exportar CSV e Exportar PDF, com os mesmos filtros e recebimentos usados na tela. PDF abre versão de impressão com identificação institucional, período, filtros, emissão, indicadores, distribuição por destinação, análise das etapas e contribuições. O usuário escolhe Salvar como PDF no navegador. Cabeçalhos de tabelas se repetem e linhas evitam quebras internas. A auditoria registra exportação CSV e solicitação de impressão, sem afirmar que o PDF foi salvo. Acesso permanece administrativo; o formato das colunas financeiras do CSV é preservado.

### Comportamento especificado

Oferecer escolha explícita entre **Exportar CSV** e **Exportar PDF** na tela Relatórios. Os dois formatos devem respeitar o mesmo período, modalidade e etapa usados na consulta, e os totais exportados devem corresponder aos dados exibidos.

O PDF deve conter identificação institucional, título, período analisado, filtros aplicados, data/hora de emissão, indicadores principais, distribuição por destinação, conversão por etapa e contribuições do período. Preparar tabelas para múltiplas páginas, com cabeçalhos repetidos, valores legíveis e ausência de cortes nas colunas. Usar apresentação adequada à impressão, com fundo claro.

Os indicadores devem manter o significado usado na tela: dados financeiros usam os recebimentos filtrados; indicadores de contatos e etapas devem explicitar sua base e data de referência. Uma distribuição pelas etapas atuais não deve ser apresentada como conversão histórica do período sem histórico que sustente esse cálculo.

O CSV deve continuar disponível para tratamento tabular, preservando os campos atuais dos lançamentos: recibo, doador, valor, pagamento, competência, modalidade, destinação, Pix e operador. Indicadores agregados adicionais no CSV dependem de definição; não alterar seu formato silenciosamente.

**Proposta compatível com o protótipo:** criar uma versão de impressão do relatório e permitir salvar como PDF pelo navegador, identificando essa etapa na interface. Download direto de PDF, sem diálogo de impressão, precisa ser confirmado como exigência antes de escolher a solução técnica.

Quando o período não possuir lançamentos, apresentar relatório sem contribuições, com totais financeiros zerados e demais indicadores conforme os dados de contatos. Não reaproveitar valores de outra consulta. Manter exportação administrativa e registrar a ação na auditoria sem tratá-la como novo recebimento.

Ao usar a impressão do navegador, registrar a abertura da versão de impressão ou a solicitação de exportação. O protótipo não pode afirmar que o usuário salvou ou imprimiu o PDF, pois o diálogo pode ser cancelado.

**Critérios de aceite:** Administrador acessa os dois formatos; Operador mantém a restrição a Relatórios; filtros e totais coincidem com a tela; PDF de várias páginas permanece legível; período vazio é representado corretamente; CSV continua utilizável.

## 11. Regras transversais e preparação da implementação

### Preservação e consistência

Preservar cadastros e histórico existentes ao acrescentar perdas, suspensões, tags e automações. Novos campos devem receber valores compatíveis em dados antigos. Não disparar boas-vindas retroativas nem aplicar regras novas a toda a base automaticamente ao abrir uma versão atualizada.

Separar quatro conceitos: **origem/direção do relacionamento**, **situação na cadência**, **status do vínculo de doação** e **condição de primeira contribuição**. Exemplo válido: WhatsApp/Inbound, fora da cadência, Suspenso e Sócio Inscrito. Cada informação deve ter rótulo e efeito próprios.

Registrar alterações relevantes com data, responsável e motivo. Ações automáticas devem identificar o sistema e a regra que as causou. Manter o comportamento responsivo e a navegação por teclado nas novas seleções e ações.

### Pontos do código para manutenção e implementação restante

| Área atual | Ajustes relacionados |
| --- | --- |
| `app.js`: funil, ficha e movimentação | Saída de cadência, perdas, motivos e retomada |
| `app.js`: `contactForm` / `contactStepTwo` | Classificação de origem e resultado das automações pós-cadastro |
| `app.js`: `statusForm`, filtros e apresentação de doadores | Suspenso, Sócio Inscrito e alertas |
| `app.js`: `listContacts` | Busca, segmentação, seleção geral e resumo de seleção |
| `app.js`: composição e revisão de campanhas | Modelos, execuções e acompanhamento das automações |
| `app.js`: `receipt` | Revisão e envio de recibo por e-mail |
| `app.js`: `reports` / `exportFinance` | Seleção de formato e consistência dos dados exportados |
| `domain.js`: validação, movimentação e auditoria | Novas regras e histórico estruturado |
| `domain.js`: `convert`, `pending`, `payment` e `reconcile` | Inscrição sem contribuição e efeitos temporais da suspensão |
| `domain.js`: `queueAutomations`, `processAutomations`, `send` e estrutura de estado | Reutilização dos eventos do AJ-03, ações do AJ-04, prevenção de duplicidade e recibos |

Essas referências indicam os pontos de manutenção dos ajustes implementados no código.

### Roteiro de validação do protótipo

1. Em E-mails → Automações, configurar, revisar e ativar uma regra operacional Site/Inbound e, se desejado, uma regra de boas-vindas por e-mail.
2. Cadastrar um contato Site e conferir etapa final, responsável, lista, tarefa e resultados na ficha; recarregar e verificar ausência de duplicidade.
3. Converter sem recebimento e conferir Sócio Inscrito; registrar a primeira contribuição e verificar remoção da condição.
4. Suspender e retomar um doador, conferindo competências conforme a política de vencimentos descrita na seção 6 e preservação do histórico.
5. Adicionar contatos a uma lista usando filtros e seleção geral; alterar filtros, desmarcar itens e testar cancelamento sem gravação.
6. Enviar e reenviar um recibo de forma simulada, verificar o destinatário e o histórico e conferir bloqueio por descadastro.
7. Como Administrador, comparar filtros e totais de tela, CSV e impressão/PDF; verificar período vazio, várias páginas e restrição ao Operador.

## 12. Decisões adotadas na demonstração e validação para produção

| Tema | Validação de negócio / produção | Decisão aplicada ao protótipo |
| --- | --- | --- |
| Consideração | A palavra isolada solicita alguma alteração na etapa? | Preservar a etapa existente até esclarecimento |
| Saída de cadência — resolvido | Situação única, em funil de perdas, incluindo antigos doadores | Implementado com cinco etapas próprias e retomada manual |
| Motivos de perda — resolvido | Categorias da seção 2 aprovadas | Sem retorno manual; Outros exige explicação |
| Site e direção — resolvido | Site e Instagram sempre Inbound, confirmado pelo solicitante | Implementado, sem exceções |
| Suspenso | Confirmar distinção institucional e política de competências para produção | Intervalo por vencimento, com início inclusivo e fim exclusivo; datas retroativas cronológicas desde a adesão; débitos anteriores preservados |
| Doador zerado | Sem pagamento histórico, sem pagamento no mês ou compromisso de valor zero? | Adesão sem primeira contribuição, como condição independente do status |
| Alertas | Quando notificar, quem recebe e com qual frequência? | Tag e aviso imediatos; tarefas recorrentes dependem de prazo definido |
| Automações — resolvido | Três disparos aprovados, intervalo configurável, configuração por ambos os perfis | Implementado em Automações; recibos permanecem no AJ-08 |
| Cadastro Inbound — escopo | O escopo inclui integração real com formulário do site? | Demonstrar cadastro local Site/Inbound com persistência local e mensagens simuladas; integração externa fora da proposta do protótipo |
| Cadastro Inbound — ações | Validar distribuição de equipe e prazos padrão para produção | Uma regra operacional ativa por origem/classificação, responsável fixo permitido, prazo configurável e mensagens reutilizadas do AJ-03; sem rodízio |
| Doações específicas | Destinação e período bastam? Há filtro por valor ou campanha? | Começar por recebimentos de uma destinação no período |
| Recibos | Definir entrega real por PDF ou link e política transacional | Representação de anexo PDF, sem gerar/transmitir arquivo no envio simulado; descadastro bloqueado mesmo com destinatário alternativo |
| PDF de relatório | Salvar pelo navegador atende ou é obrigatório download direto? | Versão de impressão com opção de salvar PDF |

Os ajustes estão implementados para demonstração local conforme as decisões acima. A validação das políticas definitivas e das integrações externas deve anteceder a adoção em produção; ela não impede testar os fluxos implementados no protótipo.

Na recorrência semanal, o campo **Dia da semana** permite escolher de domingo a sábado. O primeiro envio ocorre no dia escolhido, a partir da confirmação ou da data agendada, preservando o horário local; os seguintes repetem esse dia semanalmente. Programa??es antigas preservam seu dia original.

Na frequência **Mensal**, escolha a **ocorrência no mês** (primeira, segunda, terceira, quarta ou última) e o **dia da semana**. Exemplo: primeira segunda-feira ou última sexta-feira. O envio ocorre uma vez por mês, no horário definido, sem antecipar a data inicial. Programa??es mensais antigas sem esses campos preservam a regra anterior de dia do mês.
