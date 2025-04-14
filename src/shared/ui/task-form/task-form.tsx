import { Form, Input, Button, message } from "antd";
import {
  ProjectSelect,
  UserSelect,
  StatusSelect,
  PrioritySelect,
} from "./fields";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { createTask, TaskPayload, getTask, updateTask, getBoards } from "@api";
import { getIdByName } from "@helpers/get-id-by-name";
import { useLocation, Link } from "react-router-dom";

type TaskFormProps = {
  taskId?: number;
  onSuccess?: () => void;
  onUpdated?: () => void;
};

// Основная форма создания / редактирования задачи
const TaskForm = ({ taskId, onSuccess, onUpdated }: TaskFormProps) => {
  const [boardId, setBoardId] = useState<number>();
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const location = useLocation();
  const currentPath = location.pathname === "/issues";

  const isEditMode = !!taskId;

  // Получаем данные задачи, если передан taskId
  const { data: taskData, isLoading: isTaskLoading } = useQuery({
    queryKey: ["task", taskId],
    queryFn: () => getTask(String(taskId)),
    enabled: !!taskId,
  });

  // Заполняем форму значениями, если это режим редактирования
  useEffect(() => {
    const fillForm = async () => {
      if (!taskData) return;
      if (!taskData?.boardName) return;
      const boardId = await getIdByName(getBoards, taskData.boardName);
      setBoardId(boardId);
      const assigneeId = taskData.assignee?.id;
      // Предзаполняем поля формы
      form.setFieldsValue({
        title: taskData.title,
        description: taskData.description,
        priority: taskData.priority,
        status: taskData.status,
        boardId,
        assigneeId,
      });
    };
    fillForm();
  }, [taskData]);

  // Создание или обновление задачи
  const mutation = useMutation({
    mutationFn: isEditMode
      ? (data: TaskPayload) => updateTask(taskId!, data)
      : createTask,
    onSuccess: () => {
      message.success(isEditMode ? "Задача обновлена" : "Задача создана");
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      form.resetFields();
      onSuccess?.();
      onUpdated?.();
    },
    onError: () => {
      message.error("Ошибка при сохранении задачи");
    },
  });

  const onFinish = (values: TaskPayload) => {
    mutation.mutate(values);
  };

  return (
    <>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item name="title" label="Название" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Описание"
          rules={[{ required: true }]}
        >
          <Input.TextArea />
        </Form.Item>

        <ProjectSelect />
        <PrioritySelect />
        <StatusSelect />
        <UserSelect />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "1rem",
          }}
        >
          {currentPath && taskId && (
            <Link to={`/board/${boardId}`} state={{ taskId }}>
              Перейти на доску
            </Link>
          )}

          <Button
            htmlType="submit"
            type="primary"
            loading={mutation.isPending || isTaskLoading}
          >
            {isEditMode ? "Обновить" : "Создать"}
          </Button>
        </div>
      </Form>
    </>
  );
};

export default TaskForm;
