import { Link } from "react-router-dom";
import { Divider, Button } from "antd";

import "./header.css";

const Header = () => {
  return (
    <>
      <nav>
        <Link to="/issues">Все задачи</Link>
        <Link to="/boards">Проекты</Link>
        <Button type="primary">Создать задачу</Button>
      </nav>
      <Divider />
    </>
  );
};

export default Header;
