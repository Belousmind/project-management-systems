import Header from "../../shared/ui/header";
import { useQuery } from "@tanstack/react-query";
import BoardItem from "./ui/board-item";
const base_url = "http://localhost:8080/api/v1";

type Board = {
  id: number;
  name: string;
  description: string;
  taskCount: number;
};

const getBoards = async (): Promise<Board[]> => {
  const res = await fetch(`${base_url}/boards`);
  if (!res.ok) {
    throw new Error("Ошибка при получении досок");
  }

  const json = await res.json();
  return json.data;
};


const BoardsPage = () => {
  const { data, isLoading, error } = useQuery<Board[]>({
    queryKey: ["boards"],
    queryFn: getBoards,
  });

  if (isLoading) return <p>Загрузка...</p>;
  if (error instanceof Error) return <p>Ошибка: {error.message}</p>;

  return (
    <>
      <Header />
      <main>
        {data?.map((board) => (
          <BoardItem key={board.id} id={board.id} name={board.name}  />
        ))}
      </main>
    </>
  );
};

export default BoardsPage;
