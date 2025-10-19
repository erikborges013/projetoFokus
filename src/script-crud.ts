//Aqui foi criado uma interface. O que é interface? Interface é uma tipagem que pode ser aberta mais de uma vez
//E pode ser extendida com o extends. Ela serve para tipar.
interface Tarefa {
  descricao: string;
  concluida: boolean;
}

interface EstadoAplicacao {
  tarefas: Tarefa[];
  tarefaSelecionada: Tarefa | null;
}

let estadoInicial: EstadoAplicacao = {
  tarefas: [
    {
      descricao: "Tarefa concluída",
      concluida: true,
    },
    {
      descricao: "Tarefa pendente 1",
      concluida: false,
    },
    {
      descricao: "Tarefa pendente 2",
      concluida: false,
    },
  ],
  tarefaSelecionada: null,
};

const selecionarTarefa = (
  estado: EstadoAplicacao,
  tarefa: Tarefa
): EstadoAplicacao => {
  return {
    ...estado,
    tarefaSelecionada: tarefa === estado.tarefaSelecionada ? null : tarefa,
  };
};

const adicionanrTarefa = (
  estado: EstadoAplicacao,
  tarefa: Tarefa
): EstadoAplicacao => {
  return {
    ...estado,
    tarefas: [...estado.tarefas, tarefa],
  };
};
const btnDeletarTarefa = document.querySelector(
  ".app__form-footer__button--delete"
) as HTMLButtonElement;

const formAdicionarTarefa = document.querySelector(
  ".app__form-add-task"
) as HTMLFormElement;

const elementoNomeTarefa = document.querySelector(
  ".app__section-active-task-description"
) as HTMLParagraphElement;

let tarefaSendoEditada: string | null = null;
const atualizarUi = () => {
  const taskIconSvg = `
<svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24"
    fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="12" fill="#FFF" />
    <path
        d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z"
        fill="#01080E" />
</svg>
`;

  const ulTarefas = document.querySelector(".app__section-task-list");

  const btnAdicionarTarefa = document.querySelector<HTMLButtonElement>(
    ".app__button--add-task"
  );
  const textArea = document.querySelector<HTMLTextAreaElement>(
    ".app__form-textarea"
  );

  if (!btnAdicionarTarefa) {
    throw Error(
      "Caro colega. o elemento btnAdicionarTarefa não foi encontrado. Por favor reveja."
    );
  }

  btnAdicionarTarefa.onclick = () => {
    formAdicionarTarefa?.classList.toggle("hidden");
  };

  formAdicionarTarefa!.onsubmit = (evento) => {
    evento.preventDefault();

    const descricao = textArea!.value;
    if (tarefaSendoEditada !== null) {
      let tarefasNaoEditadas = estadoInicial.tarefas.filter(
        (t) => t.descricao !== tarefaSendoEditada
      );
      tarefasNaoEditadas.push({ descricao, concluida: false });
      estadoInicial.tarefas = tarefasNaoEditadas;
      console.log(tarefasNaoEditadas);
      atualizarUi();
      formAdicionarTarefa?.reset();
      formAdicionarTarefa?.classList.toggle("hidden");
    } else {
      estadoInicial = adicionanrTarefa(estadoInicial, {
        descricao,
        concluida: false,
      });
      atualizarUi();
      formAdicionarTarefa?.reset();
    }
  };

  if (ulTarefas) {
    ulTarefas.innerHTML = "";
  }
  estadoInicial.tarefas.forEach((tarefa) => {
    const li = document.createElement("li");
    li.classList.add("app__section-task-list-item");

    const svgIcon = document.createElement("svg");
    svgIcon.innerHTML = taskIconSvg;

    const paragraph = document.createElement("p");
    paragraph.classList.add("app__section-task-list-item-description");
    paragraph.textContent = tarefa.descricao;

    const button = document.createElement("button");
    button.classList.add("app_button-edit");

    const editIcon = document.createElement("img");
    editIcon.setAttribute("src", "/imagens/edit.png");

    button.appendChild(editIcon);

    if (tarefa.concluida) {
      button.setAttribute("disabled", "true");
      li.classList.add("app__section-task-list-item-complete");
    }

    li.appendChild(svgIcon);
    li.appendChild(paragraph);
    li.appendChild(button);

    li.addEventListener("click", () => {
      console.log("A tarefa foi clicada!");
      if (tarefa.concluida === true) {
        console.log("Essa tarefa já foi concluída!");
        return;
      }
      nomeTarefaEmExecucao(tarefa.descricao);
      deletarTarefa(tarefa);

      document.querySelectorAll("li").forEach((item) => {
        if (item !== li) {
          item.classList.remove("app__section-task-list-item-active");
        }
      });
      li.classList.toggle("app__section-task-list-item-active");
      if (!li.classList.contains("app__section-task-list-item-active")) {
        elementoNomeTarefa.textContent = "";
      }
      document.addEventListener("TarefaFinalizada", () => {
        tarefa.concluida = true;
        estadoInicial = selecionarTarefa(estadoInicial, tarefa);
        atualizarUi();
      });

      estadoInicial = selecionarTarefa(estadoInicial, tarefa);
    });

    button.addEventListener("click", () => {
      formAdicionarTarefa?.classList.toggle("hidden");

      textArea!.value = tarefa.descricao;
      tarefaSendoEditada = tarefa.descricao;
      console.log(tarefaSendoEditada);
    });

    ulTarefas?.appendChild(li);
  });
};
cancelar();
atualizarUi();
limparTarefasConcluídas();
limparTodasTarefas();

function nomeTarefaEmExecucao(nome: string) {
  elementoNomeTarefa.textContent = nome;
}

function limparTarefasConcluídas(): void {
  const btnRemoverConcluidas = document.getElementById(
    "btn-remover-concluidas"
  ) as HTMLButtonElement;
  btnRemoverConcluidas.addEventListener("click", () => {
    let tarefasNaoConcluidas = estadoInicial.tarefas.filter(
      (t) => t.concluida === false
    );
    estadoInicial.tarefas = tarefasNaoConcluidas;
    atualizarUi();
  });
}

function limparTodasTarefas(): void {
  const removerTodasTarefas = document.getElementById(
    "btn-remover-todas"
  ) as HTMLButtonElement;
  removerTodasTarefas.addEventListener("click", () => {
    estadoInicial.tarefas = [];
    atualizarUi();
  });
}

function cancelar() {
  const btnCancelar = document.querySelector(
    ".app__form-footer__button--cancel"
  ) as HTMLButtonElement;
  btnCancelar.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("botaoclicado");
    formAdicionarTarefa.reset();
    formAdicionarTarefa?.classList.toggle("hidden");
  });
}

function deletarTarefa(tarefa: Tarefa): void {
  btnDeletarTarefa.addEventListener("click", () => {
    const tarefasNaoExcluidas = estadoInicial.tarefas.filter(
      (t) => t !== tarefa
    );
    console.log(tarefasNaoExcluidas);
    estadoInicial.tarefas = tarefasNaoExcluidas;
    formAdicionarTarefa?.classList.toggle("hidden");
    formAdicionarTarefa.reset();
    atualizarUi();
  });
}
