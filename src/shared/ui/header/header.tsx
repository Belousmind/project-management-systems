import { Link } from "react-router-dom";
import { Divider, Button } from "antd";
import "./header.css";

const Header = () => {
  return (
    <>
      <header>
        <nav>
          <Link to="/issues">Все задачи</Link>
          <Link to="/boards">Проекты</Link>
        </nav>
        <Button type="primary">Создать задачу</Button>
      </header>
      <Divider />
    </>
  );
};

export default Header;
