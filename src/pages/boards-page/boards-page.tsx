import { useQuery } from "@tanstack/react-query";
import BoardItem from "./ui/board-item";
import { getBoards, BoardLite } from "@api";

const BoardsPage = () => {
  const { data, isLoading, error } = useQuery<BoardLite[]>({
    queryKey: ["boards"],
    queryFn: getBoards,
  });

  if (isLoading) return <p>Загрузка...</p>;
  if (error instanceof Error) return <p>{error.message}</p>;

  return (
    <>
      {data?.map((board) => (
        <BoardItem key={board.id} id={board.id} name={board.name} />
      ))}
    </>
  );
};

export default BoardsPage;
