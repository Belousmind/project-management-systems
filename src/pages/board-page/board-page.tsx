import { useParams } from "react-router-dom";
import Header from "../../shared/ui/header";

const BoardPage = () => {
  const { id } = useParams();

  return (
    <>
      <Header />
      <h1>Доска проекта ID: {id}</h1>
    </>
  );
};

export default BoardPage;
