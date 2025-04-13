import { getBoards, BoardLite } from "@api";

export const getBoardNameById = async (
  id: number
): Promise<string | undefined> => {
  try {
    const boards: BoardLite[] = await getBoards();
    const board = boards.find((b) => b.id === id);
    return board?.name;
  } catch (error) {
    console.error("Ошибка при получении имени доски:", error);
    return undefined;
  }
};
