import { Modal } from "antd";
import { ReactNode } from "react";
import TaskForm from "./task-form/task-form";

type AppModalProps = {
  open: boolean;
  onClose: () => void;
  taskId?: number;
  onUpdated?: () => void;
  children?: ReactNode;
};

const AppModal = ({ open, onClose, taskId, onUpdated }: AppModalProps) => {
  const isEdit = typeof taskId === "number";
  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      title={isEdit ? "Редактирование задачи" : "Создание задачи"}
      destroyOnClose
    >
      <TaskForm taskId={taskId} onSuccess={onClose} onUpdated={onUpdated} />
    </Modal>
  );
};

export default AppModal;
