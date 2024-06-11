import { useEffect, useState } from "react";
import { db } from "../../services/firebaseConnection";
import {
  getDocs,
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

export const Tarefa: React.FC = () => {
  interface TaskProps {
    id: string;
    name: string;
    isCompleted: boolean;
  }

  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const [name, setName] = useState<string>("");
  const [isCompleted, setIscompletd] = useState<boolean>(false);
  const [editingTask, setEditingTask] = useState<TaskProps | null>(null);

  const fetchTasks = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "tasks"));
      const tasksData: TaskProps[] = querySnapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          } as TaskProps)
      );
      setTasks(tasksData);
    } catch (error) {
      console.error("Error fetching tasks. ", error);
    }
  };

  const handleAddTask = async () => {
    if (!name) {
      alert("Há campos não preenchidos!");
      return;
    }
    try {
      const docRef = await addDoc(collection(db, "tasks"), {
        name,
        isCompleted,
      });
      setTasks([
        ...tasks,
        {
          id: docRef.id,
          name,
          isCompleted,
        },
      ]);
      resetForm();
    } catch (error) {
      console.error("Erro adding Task ", error);
    }
  };

  const handleUpdateTask = async (id: string) => {
    if (!name) {
      alert("Há campos não preenchidos!");
      return;
    }
    try {
      const taskDoc = doc(db, "tasks", id);
      await updateDoc(taskDoc, {
        name,
        isCompleted,
      });
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, name, isCompleted } : task
        )
      );
      resetForm();
      setEditingTask(null);
    } catch (error) {
      console.error("Erro updating Task ", error);
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      const taskDoc = doc(db, "tasks", id);
      await deleteDoc(taskDoc);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Erro deleting Task ", error);
    }
  };

  const resetForm = () => {
    setName(""), setIscompletd(false);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    if (editingTask) {
      setName(editingTask.name);
      setIscompletd(editingTask.isCompleted);
    } else {
      resetForm();
    }
  }, [editingTask]);

  return (
    <>
      <label>Tarefa </label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label>Completada?</label>
      <input
        type="checkbox"
        checked={isCompleted}
        onChange={(e) => setIscompletd(e.target.checked)}
      />
      <button
        onClick={
          editingTask ? () => handleUpdateTask(editingTask.id) : handleAddTask
        }
      >
        {editingTask ? "Salvar" : "Cadastrar"}
      </button>

      <button onClick={resetForm}>Limpar</button>

      <table>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Status</th>
          <th>Ação</th>
        </tr>
        {tasks.map((task) => (
          <tr key={task.id}>
            <th>{task.id}</th>
            <th>{task.name}</th>
            <th>{task.isCompleted ? "Feito" : "Pendente"} </th>
            <th>
              <button onClick={() => setEditingTask(task)}>Editar</button>
              <button onClick={() => handleDeleteTask(task.id)}>Excluir</button>
            </th>
          </tr>
        ))}
      </table>
    </>
  );
};
