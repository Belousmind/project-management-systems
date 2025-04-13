import "./task-item.css";
import { useState } from "react";
import { AppModal } from "@ui";

type TaskItemProps = {
  id: number;
  title: string;
  onUpdated?: () => void;
};

const TaskItem = ({ id, title, onUpdated }: TaskItemProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="issue-item" onClick={() => setIsModalOpen(true)}>
        <span>{title}</span>
      </div>
      <AppModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        taskId={id}
        onUpdated={onUpdated}
      ></AppModal>
    </>
  );
};

export default TaskItem;
