import request from "../services/requests";
import type { BoardLite, Task } from "./types";

export const getBoards = () => request<BoardLite[]>("/boards");
export const getBoardTasks = (id: string) => request<Task[]>(`/boards`, `/${id}`);

export const getTasks = () => request<Task[]>("/tasks");

// export const getTask = (id: string) => request(`/tasks`, `/${id}`);

// export const getTeams = () => request("/teams");
// export const getTeam = (id: string) => request(`/teams`, `/${id}`);

// export const getUsers = () => request("/users");
// export const getUserTasks = (id: string) =>
//   request(`/users`, `/${id}/tasks`);