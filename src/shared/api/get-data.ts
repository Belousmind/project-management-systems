import request from "../services/requests";
import type { BoardLite, Task, User } from "./types";

export const getBoards = () => request<BoardLite[]>("/boards");
export const getBoardTasks = (id: string) =>
  request<Task[]>(`/boards`, `/${id}`);

export const getTasks = () => request<Task[]>("/tasks");

export const getTask = (id: string) => request<Task>(`/tasks`, `/${id}`);

export const getUsers = () => request<User[]>("/users");
