const btnAdicionarTarefa = document.querySelector(".app__button--add-task");
const formularioAdicionarTarefa = document.querySelector(".app__form-add-task");
const inputTexto = document.querySelector(".app__form-textarea");
const containerLista = document.querySelector(".app__section-task-list");
let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
const tarefaQueEstaSendoExecutada = document.querySelector(".app__section-active-task-description");
let liTarefaSelecionada = null;
const btnRemoverConcluidas = document.getElementById("btn-remover-concluidas");
const btnRemoverTodas = document.getElementById("btn-remover-todas");
function atualizarTarefa() {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));

}

function criarElementoTarefa(tarefa) {
    const li = document.createElement("li");
    li.classList.add("app__section-task-list-item");

    const svg = document.createElement("svg");
    svg.innerHTML = `
    <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
        </svg>
        `;
    const paragrafo = document.createElement("p");
    paragrafo.classList.add("app__section-task-list-item-description");
    paragrafo.textContent = tarefa.descricao;

    const botao = document.createElement("button");
    botao.classList.add("app_button-edit");

    botao.onclick = () => {
        const tarefaAtualizada = prompt("Digite aqui para editar a tarefa:");
        if(!tarefaAtualizada) {
            alert("Campo vazio! Digite alguma coisa.")
            return;
        }
            paragrafo.textContent = tarefaAtualizada;
            tarefa.descricao = tarefaAtualizada;
            atualizarTarefa()
        

    }

    const imagemBotao = document.createElement('img')
    imagemBotao.setAttribute('src', '/imagens/edit.png')
    botao.append(imagemBotao)

    li.append(svg);
    li.append(paragrafo);
    li.append(botao);
    li.tarefa = tarefa;

    if (tarefa.completa) {
            li.classList.add("app__section-task-list-item-complete");
            botao.setAttribute("disabled", "disabled");
    } else {
            li.onclick = () => {
                const todosLi = document.querySelectorAll(".app__section-task-list-item");
                todosLi.forEach(outroLi => {if (outroLi !== li) {
                    outroLi.classList.remove("app__section-task-list-item-active")
                }
                });
                
                if (li.classList.contains("app__section-task-list-item-active")) {
                    tarefaQueEstaSendoExecutada.textContent = "";
                    li.classList.remove("app__section-task-list-item-active");
                    liTarefaSelecionada = null;
                } else {
                    tarefaQueEstaSendoExecutada.textContent = tarefa.descricao;
                    li.classList.add("app__section-task-list-item-active");
                }
                liTarefaSelecionada = li;
            }

    }

    return li;
}

btnAdicionarTarefa.addEventListener("click", () => {
    formularioAdicionarTarefa.classList.toggle("hidden");
});

formularioAdicionarTarefa.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const tarefa = {
        descricao: inputTexto.value
    }
    tarefas.push(tarefa);
    atualizarTarefa();
    const elementoTarefa = criarElementoTarefa(tarefa);
    containerLista.append(elementoTarefa);
    inputTexto.value = "";
    formularioAdicionarTarefa.classList.add("hidden");
})

    tarefas.forEach((tarefa) => {
        const itemLista = criarElementoTarefa(tarefa)
        containerLista.append(itemLista);
    })  

    document.querySelector(".app__form-footer__button--cancel").addEventListener("click", (evento) => {
        debugger;
        evento.preventDefault();
        inputTexto.value = "";
        formularioAdicionarTarefa.classList.add("hidden");
    })

    document.addEventListener("FocoFinalizado", () => {
        if (liTarefaSelecionada) {
            liTarefaSelecionada.classList.remove("app__section-task-list-item-active");
            liTarefaSelecionada.classList.add("app__section-task-list-item-complete");
            liTarefaSelecionada.querySelector("button").setAttribute("disabled", "disabled");
            liTarefaSelecionada.tarefa.completa = true;
            atualizarTarefa();
        }
    });

    const removerTarefas = (somenteCompletas) => {
        const seletor = somenteCompletas ? ".app__section-task-list-item-complete": ".app__section-task-list-item";
        document.querySelectorAll(seletor).forEach(elemento => {
            elemento.remove();
        })
        tarefas = somenteCompletas ? tarefas.filter(tarefa => !tarefa.completa) : [];
        atualizarTarefa();
    }

    btnRemoverConcluidas.onclick = () => removerTarefas(true);
    btnRemoverTodas.onclick = () => removerTarefas(false);