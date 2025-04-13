import "./task-item.css";
import { useState, useEffect } from "react";
import { AppModal } from "@ui";

type TaskItemProps = {
  id: number;
  title: string;
  onUpdated?: () => void;
  openedByDefault?: boolean;
};

const TaskItem = ({ id, title, onUpdated, openedByDefault }: TaskItemProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (openedByDefault) {
      setIsModalOpen(true);
    }
  }, [openedByDefault]);

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
