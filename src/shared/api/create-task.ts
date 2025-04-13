import { TaskPayload } from "./types";

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