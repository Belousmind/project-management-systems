import { useParams, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import "./board-page.css";
import { TaskItem } from "@ui";
import { getBoardTasks, Task } from "@api";
import { useEffect, useState } from "react";
import { getBoardNameById } from "@helpers/get-name-by-id";

const statuses = {
  InProgress: "In Progress",
  Done: "Done",
  Backlog: "Backlog",
};

const BoardPage = () => {
  const { id } = useParams();
  const [boardName, setBoardName] = useState("");
  const location = useLocation();
  const [modalTaskId, setModalTaskId] = useState<number>();

  useEffect(() => {
    if (id) {
      getBoardNameById(Number(id)).then((name) => {
        if (name) setBoardName(name);
      });
    }
  }, [id]);

  useEffect(() => {
    const state = location.state as { taskId?: number };
    if (state?.taskId) {
      setModalTaskId(state.taskId);
    }
  }, [location.state]);

  const {
    data: tasks,
    isLoading,
    error,
    refetch,
  } = useQuery<Task[]>({
    queryKey: ["board-tasks", id],
    queryFn: () => getBoardTasks(id!),
    enabled: !!id,
  });

  if (isLoading) return <p>Загрузка задач...</p>;
  if (error instanceof Error) return <p>{error.message}</p>;

  return (
    <>
      <h1>{boardName}</h1>
      <div className="board">
        {Object.entries(statuses).map(([statusKey, statusTitle]) => (
          <div key={statusKey} className="board-column">
            <h2>{statusTitle}</h2>
            {tasks
              ?.filter((task) => task.status === statusKey)
              .map((task) => (
                <TaskItem
                  onUpdated={refetch}
                  key={task.id}
                  id={task.id}
                  title={task.title}
                  openedByDefault={task.id === modalTaskId}
                />
              ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default BoardPage;
