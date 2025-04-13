import request from "../services/requests";
import type { BoardLite, Task, User, TaskPayload } from "./types";

export const getBoards = () => request<BoardLite[]>("/boards");
export const getBoardTasks = (id: string) =>
  request<Task[]>(`/boards`, `/${id}`);

export const getTasks = () => request<Task[]>("/tasks");

export const getTask = (id: string) => request<Task>(`/tasks`, `/${id}`);

export const getUsers = () => request<User[]>("/users");

export const createTask = async (data: TaskPayload) => {
  const res = await fetch("http://localhost:8080/api/v1/tasks/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Не удалось создать задачу");
  }

  const json = await res.json();
  return json.data;
};

export const updateTask = (id: number, data: TaskPayload) =>
  fetch(`http://localhost:8080/api/v1/tasks/update/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((res) => {
    if (!res.ok) throw new Error("Ошибка при обновлении задачи");
    return res.json().then((json) => json.data);
  });
