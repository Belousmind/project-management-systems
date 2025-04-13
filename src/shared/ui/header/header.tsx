import { Link } from "react-router-dom";
import { Divider, Button } from "antd";
import "./header.css";
import { useState } from "react";
import { AppModal } from "@ui";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <header>
        <nav>
          <Link to="/issues">Все задачи</Link>
          <Link to="/boards">Проекты</Link>
        </nav>
        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          Создать задачу
        </Button>
      </header>
      <Divider />

      <AppModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Header;
