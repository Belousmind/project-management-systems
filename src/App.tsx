import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { BoardsPage, BoardPage, TasksPage } from "./pages";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/issues" replace />} />
        <Route path="/boards" element={<BoardsPage />} />
        <Route path="/board/:id" element={<BoardPage />} />
        <Route path="/issues" element={<TasksPage />} />
      </Routes>
    </Router>
  );
}

export default App;
