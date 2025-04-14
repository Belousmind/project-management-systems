import { TaskPayload } from "./types";
import { base_url } from "../services/requests";

export const createTask = async (data: TaskPayload) => {
  const res = await fetch(`${base_url}/tasks/create`, {
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
