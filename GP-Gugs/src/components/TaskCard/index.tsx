// components/TaskCard.tsx
import React from "react";
import { TaskProps } from "../../types";

interface TaskCardProps {
  tarefa: TaskProps;
  projetoId: string;
}

const TaskCard: React.FC<TaskCardProps> = ({ tarefa, projetoId }) => {
  const handleToggleCompleted = () => {
    // Lógica para marcar a tarefa como concluída ou não
  };

  return (
    <div className="flex items-center mb-2">
      <input
        type="checkbox"
        checked={tarefa.isCompleted}
        onChange={handleToggleCompleted}
        className="mr-2"
      />
      <p>{tarefa.name}</p>
    </div>
  );
};

export default TaskCard;
