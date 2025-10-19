#Projeto Fokus
Projeto Fokus é uma aplicação web de gerenciamento de tempo baseada no método Pomodoro, combinada com um gerenciador de tarefas (lista de afazeres). A aplicação permite ao usuário alternar entre períodos de foco, descanso curto e descanso longo, enquanto gerencia suas tarefas diárias.

Este projeto foi desenvolvido como parte do curso "JavaScript: explorando a manipulação de elementos e da localStorage" da Alura, com foco principal na manipulação do DOM e no uso do localStorage para persistência de dados.

✨ Funcionalidades Principais
Timer Pomodoro: Temporizador com três modos pré-definidos:

Foco: Período de trabalho concentrado (padrão de 25 minutos).

Descanso Curto: Pausa curta (padrão de 5 minutos).

Descanso Longo: Pausa longa (padrão de 15 minutos).

Lista de Tarefas (CRUD):

Adicionar novas tarefas.

Editar tarefas existentes.

Marcar tarefas como concluídas.

Remover tarefas concluídas ou todas as tarefas.

Persistência de Dados: As tarefas adicionadas são salvas no localStorage do navegador, garantindo que não sejam perdidas ao recarregar a página.

Integração Timer-Tarefas: Ao finalizar um ciclo de "Foco", a tarefa selecionada como "em andamento" é automaticamente marcada como concluída.

Ambiente Imersivo:

Música de Fundo: Opção de ligar ou desligar uma música ambiente relaxante (luna-rise-part-one.mp3).

Feedback Sonoro: Efeitos sonoros para iniciar, pausar e finalizar o temporizador.

UI Dinâmica: O tema visual da aplicação (cores e imagem de fundo) muda dinamicamente para combinar com o modo atual (Foco, Descanso Curto ou Longo).

🚀 Tecnologias Utilizadas
HTML5: Estruturação semântica da aplicação.

CSS3: Estilização responsiva e customização de componentes, incluindo variáveis CSS para troca de temas.

JavaScript (ES6+):

Manipulação do DOM (criação e atualização de elementos).

Eventos (clicks, submit, change).

Web Audio API (para música e efeitos sonoros).

localStorage (para armazenamento de tarefas).

Eventos Customizados (CustomEvent) para comunicação entre os scripts do timer e do CRUD.
