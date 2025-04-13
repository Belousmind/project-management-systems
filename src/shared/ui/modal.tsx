import { Modal } from "antd";
import { ReactNode } from "react";
import TaskForm from "./task-form/task-form";

type AppModalProps = {
  open: boolean;
  onClose: () => void;
  taskId?: number;
  children?: ReactNode;
};

const AppModal = ({ open, onClose, taskId }: AppModalProps) => {
  const isEdit = typeof taskId === "number";
  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      title={isEdit ? "Редактирование задачи" : "Создание задачи"}
      destroyOnClose
    >
      <TaskForm taskId={taskId} />
    </Modal>
  );
};

export default AppModal;
