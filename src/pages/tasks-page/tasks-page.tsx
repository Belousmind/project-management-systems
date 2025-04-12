import { Header } from "@ui";
import { useQuery } from "@tanstack/react-query";
import TaskItem from "@ui/task-item/task-item";

import { getTasks, Task } from "@api";

const TasksPage = () => {
  const { data, isLoading, error } = useQuery<Task[]>({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });

  if (isLoading) return <p>Загрузка...</p>;
  if (error instanceof Error) return <p>{error.message}</p>;

  return (
    <>
      <Header />
      <main>
        {data?.map((task) => (
          <TaskItem key={task.id} title={task.title} id={task.id} />
        ))}
      </main>
    </>
  );
};

export default TasksPage;
