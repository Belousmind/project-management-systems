import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <Link to="/boards">Все задачи</Link>
      <Link to="/issues">Проекты</Link>
      <button>Создать задачу</button>
    </>
  );
};

export default Header;
