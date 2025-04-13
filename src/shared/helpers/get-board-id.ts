type WithIdAndName = {
  id: number;
  name?: string;
  fullName?: string;
};

export const getIdByName = async <T extends WithIdAndName>(
  getDataFn: () => Promise<T[]>,
  name: string
): Promise<number | undefined> => {
  try {
    const items = await getDataFn();

    const found = items.find(
      (item) => item.name === name || item.fullName === name
    );

    return found?.id;
  } catch (error) {
    console.error("Ошибка при поиске ID по имени:", error);
    return undefined;
  }
};
