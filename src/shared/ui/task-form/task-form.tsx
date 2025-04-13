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
import { getIdByName } from "@helpers/get-board-id";
import { useLocation, Link } from "react-router-dom";

type TaskFormProps = {
  taskId?: number;
  onSuccess?: () => void;
};

const TaskForm = ({ taskId, onSuccess }: TaskFormProps) => {
  const [boardId, setBoardId] = useState<number>();
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const location = useLocation();
  const currentPath = location.pathname === "/issues";

  const isEditMode = !!taskId;

  const { data: taskData, isLoading: isTaskLoading } = useQuery({
    queryKey: ["task", taskId],
    queryFn: () => getTask(String(taskId)),
    enabled: !!taskId,
  });

  useEffect(() => {
    const fillForm = async () => {
      if (!taskData) return;
      if (!taskData?.boardName) return;
      const boardId = await getIdByName(getBoards, taskData.boardName);
      setBoardId(boardId);
      const assigneeId = taskData.assignee?.id;

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
    console.log(taskData?.boardId);
  }, [taskData]);

  const mutation = useMutation({
    mutationFn: isEditMode
      ? (data: TaskPayload) => updateTask(taskId!, data)
      : createTask,
    onSuccess: () => {
      message.success(isEditMode ? "Задача обновлена" : "Задача создана");
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      form.resetFields();
      onSuccess?.();
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

        {currentPath && <Link to={`/board/${boardId}`}>Перейти на доску</Link>}
        <Button
          htmlType="submit"
          type="primary"
          loading={mutation.isPending || isTaskLoading}
        >
          {isEditMode ? "Обновить" : "Создать"}
        </Button>
      </Form>
    </>
  );
};

export default TaskForm;
