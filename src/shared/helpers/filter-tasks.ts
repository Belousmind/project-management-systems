import { Task } from "@api";
import { TaskFilters } from "@hooks/use-task-filters";

export const filterTasks = (tasks: Task[], filters: TaskFilters): Task[] => {
  const { status, board, title, assignee } = filters;

  return tasks.filter((task) => {
    const matchStatus = status ? task.status === status : true;
    const matchBoard = board ? task.boardName === board : true;
    const matchTitle = task.title.toLowerCase().includes(title.toLowerCase());
    const matchAssignee = assignee
      ? task.assignee?.fullName.toLowerCase().includes(assignee.toLowerCase())
      : true;

    return matchStatus && matchBoard && matchTitle && matchAssignee;
  });
};
