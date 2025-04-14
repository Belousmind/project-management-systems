import { TaskPayload } from "./types";
import { base_url } from "../services/requests";

export const updateTask = (id: number, data: TaskPayload) =>
  fetch(`${base_url}/tasks/update/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((res) => {
    if (!res.ok) throw new Error("Ошибка при обновлении задачи");
    return res.json().then((json) => json.data);
  });