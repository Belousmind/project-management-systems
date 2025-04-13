import { useQuery } from "@tanstack/react-query";
import TaskItem from "@ui/task-item/task-item";

import { getTasks, Task } from "@api";

// Фильтр по статусу задачи
// Фильтр по доске, к которой он привязан
// Поиск по названию задачи
// Поиск по исполнителю

const TasksPage = () => {
  const { data, isLoading, error } = useQuery<Task[]>({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });

  if (isLoading) return <p>Загрузка...</p>;
  if (error instanceof Error) return <p>{error.message}</p>;

  return (
    <>
      {data?.map((task) => (
        <TaskItem key={task.id} title={task.title} id={task.id} />
      ))}
    </>
  );
};

export default TasksPage;
