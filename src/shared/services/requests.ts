export const base_url = "http://localhost:8080/api/v1";

const request = async <T = any>(path?: string, id: string = ""): Promise<T> => {
  const res = await fetch(`${base_url}${path}${id}`);
  if (!res.ok) {
    throw new Error("Ошибка при запросе");
  }
  const json = await res.json();
  return json.data;
};

export default request;
