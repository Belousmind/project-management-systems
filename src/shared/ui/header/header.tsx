import { NavLink } from "react-router-dom";
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
          <NavLink
            to="/issues"
            className={({ isActive }) =>
              isActive ? "link active" : "link"
            }
          >
            Все задачи
          </NavLink>

          <NavLink
            to="/boards"
            className={({ isActive }) =>
              isActive ? "link active" : "link"
            }
          >
            Проекты
          </NavLink>
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
