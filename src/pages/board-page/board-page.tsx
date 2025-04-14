import { useParams, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { TaskItem } from "@ui";
import { getBoardTasks, Task } from "@api";
import { getBoardNameById } from "@helpers/get-name-by-id";
import { base_url } from "@services/requests";

import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";

import "./board-page.css";

const statuses = {
  Backlog: "Backlog",
  InProgress: "In Progress",
  Done: "Done",
};

const BoardPage = () => {
  // Получаем параметры маршрута и состояние перехода
  const { id } = useParams();
  const location = useLocation();
  
  // Локальное состояние: имя доски и ID задачи, открытой в модальном окне
  const [boardName, setBoardName] = useState("");
  const [modalTaskId, setModalTaskId] = useState<number>();

  // При монтировании компонента получаем имя доски по её ID
  useEffect(() => {
    if (id) {
      getBoardNameById(Number(id)).then((name) => {
        if (name) setBoardName(name);
      });
    }
  }, [id]);

  // Если при переходе в location передан taskId, открываем соответствующую задачу
  useEffect(() => {
    const state = location.state as { taskId?: number };
    if (state?.taskId) {
      setModalTaskId(state.taskId);
    }
  }, [location.state]);

  // Получаем задачи доски по её ID
  const {
    data: tasks,
    isLoading,
    error,
    // Перезапрашиваем задачи после обновления
    refetch,
  } = useQuery<Task[]>({
    queryKey: ["board-tasks", id],
    queryFn: () => getBoardTasks(id!),
    enabled: !!id,
  });

  // Обновление статуса задачи
  const updateStatus = async (taskId: number, newStatus: string) => {
    try {
      await fetch(`${base_url}/tasks/updateStatus/${taskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      refetch();
    } catch (error) {
      console.error("Ошибка при обновлении статуса", error);
    }
  };

  // Обработка завершения перетаскивания
  const handleDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;
    if (!destination || destination.droppableId === source.droppableId) return;

    const taskId = parseInt(draggableId);
    updateStatus(taskId, destination.droppableId);
  };

  if (isLoading) return <p>Загрузка задач...</p>;
  if (error instanceof Error) return <p>{error.message}</p>;

  return (
    <>
      <h1>{boardName}</h1>
      {/* Обёртка drag-and-drop логики */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="board">
           {/* Отрисовка колонок задач по статусам */}
          {Object.entries(statuses).map(([statusKey, statusTitle]) => (
            <div className="board-column" key={statusKey}>
              <h2>{statusTitle}</h2>
              {/* Каждая колонка — это область, куда можно сбрасывать задачи */}
              <Droppable droppableId={statusKey}>
                {(provided, snapshot) => (
                  <div
                    className={`board-column__tasks ${
                      snapshot.isDraggingOver ? "drag-over" : ""
                    }`}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {tasks
                      ?.filter((task) => task.status === statusKey)
                      .map((task, index) => (
                        <Draggable
                          key={task.id}
                          draggableId={task.id.toString()}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <TaskItem
                                key={task.id}
                                id={task.id}
                                title={task.title}
                                onUpdated={refetch}
                                openedByDefault={task.id === modalTaskId}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </>
  );
};

export default BoardPage;
