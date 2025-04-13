import { TaskPayload } from "./types";

export const updateTask = (id: number, data: TaskPayload) =>
  fetch(`http://localhost:8080/api/v1/tasks/update/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((res) => {
    if (!res.ok) throw new Error("Ошибка при обновлении задачи");
    return res.json().then((json) => json.data);
  });