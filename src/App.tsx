import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { BoardsPage, BoardPage, IssuesPage } from "./pages";
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/boards" replace />} />
        <Route path="/boards" element={<BoardsPage />} />
        <Route path="/board/:id" element={<BoardPage />} />
        <Route path="/issues" element={<IssuesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
