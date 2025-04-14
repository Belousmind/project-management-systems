export type UserLite = {
  id: number;
  fullName: string;
  email: string;
  avatarUrl: string;
};

export type User = UserLite & {
  description: string;
  teamId: number;
  teamName: string;
  tasksCount: number;
};

export type TaskBase = {
  id: number;
  title: string;
  description: string;
  status: "Backlog" | "InProgress" | "Done";
  priority: "Low" | "Medium" | "High";
};

export type Task = TaskBase & {
  assignee: UserLite;
  assigneeId?: number;
  boardId?: number;
  boardName?: string;
};

export type UserTask = TaskBase & {
  boardName: string;
};

export type BoardLite = {
  id: number;
  name: string;
  description: string;
  taskCount: number;
};

export type Board = {
  id: number;
  title: string;
  description: string;
  assignee: UserLite;
  status: "Backlog" | "InProgress" | "Done";
  priority: "Low" | "Medium" | "High";
};

export type Team = {
  id: number;
  name: string;
  description: string;
  users: User[];
  boards: BoardLite[];
};

export type TeamLite = {
  id: number;
  name: string;
  description: string;
  usersCount: number;
  boardsCount: number;
};

export type TaskPayload = {
  title: string;
  description: string;
  status?: "Backlog" | "InProgress" | "Done";
  priority: "Low" | "Medium" | "High";
  boardId: number;
  assigneeId: number;
};