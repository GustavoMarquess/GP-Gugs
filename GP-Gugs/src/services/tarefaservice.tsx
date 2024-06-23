import { db } from "./firebaseConnection";
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { TaskProps } from "../types";

export const addTarefa = async (projetoId: string, name: string) => {
  const tarefaRef = await addDoc(
    collection(db, `projetos/${projetoId}/tarefas`),
    {
      name,
      status: "A fazer",
      isCompleted: false,
    }
  );
  return { id: tarefaRef.id, name, status: "A fazer", isCompleted: false };
};

export const updateTarefa = async (projetoId: string, tarefa: TaskProps) => {
  const tarefaDoc = doc(db, `projetos/${projetoId}/tarefas`, tarefa.id);
  await updateDoc(tarefaDoc, { ...tarefa });
};

export const deleteTarefa = async (projetoId: string, tarefaId: string) => {
  const tarefaDoc = doc(db, `projetos/${projetoId}/tarefas`, tarefaId);
  await deleteDoc(tarefaDoc);
};
