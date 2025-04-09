import Header from "../../shared/ui/header";
import { useQuery } from "@tanstack/react-query";
import IssueItem from "./ui/issue-item";

const base_url = "http://localhost:8080/api/v1";

type Issue = {
  id: number;
  title: string;
  status: string;
};

const getIssues = async (): Promise<Issue[]> => {
  const res = await fetch(`${base_url}/tasks`);
  if (!res.ok) {
    throw new Error("Ошибка при получении задач");
  }

  const json = await res.json();
  return json.data;
};

const IssuesPage = () => {
  const { data, isLoading, error } = useQuery<Issue[]>({
    queryKey: ["issues"],
    queryFn: getIssues,
  });

  if (isLoading) return <p>Загрузка...</p>;
  if (error instanceof Error) return <p>Ошибка: {error.message}</p>;

  return (
    <>
      <Header />
      <main>
        {data?.map((issue) => (
          <IssueItem key={issue.id} title={issue.title} />
        ))}
      </main>
    </>
  );
};

export default IssuesPage;
