export interface PersonProps {
  id: string;
  name: string;
  email: string;
}

export interface TaskProps {
  id: string;
  name: string;
  isCompleted: boolean;
  projetoId: string;
}


export interface Projeto {
  id: string;
  nome: string;
  responsavelId: string;
  responsavelNome: string;
  status: "A fazer" | "Fazendo" | "Concluído";
  tarefas: TaskProps[]; // Array de tarefas associadas ao projeto
  dataConclusao: string; // Adicionando a propriedade dataConclusao
}
export interface Tarefa {
  id: string;
  name: string;
  isCompleted: boolean;
  projetoId: string;
}