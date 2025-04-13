import { useQuery } from "@tanstack/react-query";
import TaskItem from "@ui/task-item/task-item";
import { getTasks, getBoards, Task, BoardLite } from "@api";
import { useDebounce, useTaskFilters } from "@hooks";
import {
  TaskTitleFilter,
  TaskAssigneeFilter,
  TaskBoardFilter,
  TaskStatusFilter,
} from "./ui";
import { filterTasks } from "@helpers/filter-tasks";
import "./task-page.css";

const TasksPage = () => {
  const { filters, setFilter } = useTaskFilters();
  const debouncedTitle = useDebounce(filters.title, 400);
  const debouncedAssignee = useDebounce(filters.assignee, 400);

  const {
    data: tasks,
    isLoading,
    error,
  } = useQuery<Task[]>({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });

  const { data: boards, isLoading: isBoardsLoading } = useQuery<BoardLite[]>({
    queryKey: ["boards"],
    queryFn: getBoards,
  });

  const filteredTasks = tasks
    ? filterTasks(tasks, {
        status: filters.status,
        board: filters.board,
        title: debouncedTitle,
        assignee: debouncedAssignee,
      })
    : [];

  if (isLoading) return <p>Загрузка задач...</p>;
  if (error instanceof Error) return <p>{error.message}</p>;

  return (
    <>
      <div className="filters-container">
        <TaskTitleFilter
          value={filters.title}
          onChange={(value) => setFilter("title", value)}
        />
        <TaskAssigneeFilter
          value={filters.assignee}
          onChange={(value) => setFilter("assignee", value)}
        />
        <TaskStatusFilter
          value={filters.status}
          onChange={(value) => setFilter("status", value)}
        />
        <TaskBoardFilter
          value={filters.board}
          onChange={(value) => setFilter("board", value)}
          boards={boards}
          loading={isBoardsLoading}
        />
      </div>

      {filteredTasks?.length === 0 && <p>Ничего не найдено</p>}

      {filteredTasks?.map((task) => (
        <TaskItem key={task.id} title={task.title} id={task.id} />
      ))}
    </>
  );
};

export default TasksPage;
