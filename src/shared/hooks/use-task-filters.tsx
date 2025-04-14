import { useState } from "react";

export type TaskFilters = {
  title: string;
  assignee: string;
  status?: string;
  board?: string;
};

export function useTaskFilters() {
  const [filters, setFilters] = useState<TaskFilters>({
    title: "",
    assignee: "",
    status: undefined,
    board: undefined,
  });

  const setFilter = <K extends keyof TaskFilters>(
    key: K,
    value: TaskFilters[K]
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return {
    filters,
    setFilter,
  };
}
