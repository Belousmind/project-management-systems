import "./task-item.css";
import { useState } from "react";
import { AppModal } from "@ui";

type TaskItemProps = {
  id: number;
  title: string;
};

const TaskItem = ({ id, title }: TaskItemProps) => {
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
      ></AppModal>
    </>
  );
};

export default TaskItem;
