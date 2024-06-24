import React, { useState } from "react";
import { TaskProps } from "../../types";

interface TaskFormProps {
  projetoId: string;
  onClose: () => void;
  onSubmit: (novaTarefa: Omit<TaskProps, "id">) => Promise<void>; // Renomeado para onSubmit
}

const TaskForm: React.FC<TaskFormProps> = ({ projetoId, onClose, onSubmit }) => {
  const [novaTarefa, setNovaTarefa] = useState<Omit<TaskProps, "id">>({
    name: "",
    isCompleted: false,
    projetoId: projetoId,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNovaTarefa((prevTarefa) => ({
      ...prevTarefa,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSubmit(novaTarefa); // Chama a função onSubmit para armazenar no banco
      setNovaTarefa({ name: "", isCompleted: false, projetoId });
      onClose(); // Fecha o formulário após submeter
    } catch (error) {
      console.error("Erro ao adicionar tarefa: ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <label className="block mb-2">
        Nome da Tarefa:
        <input
          type="text"
          name="name"
          value={novaTarefa.name}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-1 w-full mt-1"
          required
        />
      </label>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
      >
        Adicionar Tarefa
      </button>
      <button
        type="button"
        onClick={onClose}
        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
      >
        Cancelar
      </button>
    </form>
  );
};

export default TaskForm;
