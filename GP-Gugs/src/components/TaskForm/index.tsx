// components/TaskForm/index.tsx

import React, { useState } from "react";
import { db } from "../../services/firebaseConnection";
import { collection, addDoc } from "firebase/firestore";

interface TaskFormProps {
  projetoId: string;
  onTaskAdded: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ projetoId, onTaskAdded }) => {
  const [name, setName] = useState("");

  const handleAddTask = async () => {
    if (!name) {
      alert("O nome da tarefa é obrigatório!");
      return;
    }
    try {
      await addDoc(collection(db, "tarefas"), {
        name,
        isCompleted: false,
        projetoId,
      });
      setName(""); // Limpa o campo após adicionar a tarefa
      onTaskAdded(); // Callback para atualizar a lista de tarefas após adição
    } catch (error) {
      console.error("Erro ao adicionar tarefa: ", error);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <h2 className="text-lg font-bold mb-2">Nova Tarefa</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nome da tarefa"
        className="w-full p-2 border rounded mb-2"
      />
      <button
        onClick={handleAddTask}
        className="bg-blue-500 text-white py-2 px-4 rounded"
      >
        Adicionar
      </button>
    </div>
  );
};

export default TaskForm;
