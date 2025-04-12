import { Link } from "react-router-dom";
import "./board-item.css";

type BoardItemProps = {
  id: number;
  name: string;
};

const BoardItem = ({ id, name }: BoardItemProps) => {
  return (
    <div className="board-item">
      <h3>{name}</h3>
      <Link to={`/board/${id}`} state={{ name }}>Перейти к доске</Link>
    </div>
  );
};

export default BoardItem;
