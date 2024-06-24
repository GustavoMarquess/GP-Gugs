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
  tarefas: TaskProps[]; 
  dataConclusao: string; 
}
export interface Tarefa {
  id: string;
  name: string;
  isCompleted: boolean;
  projetoId: string;
}
