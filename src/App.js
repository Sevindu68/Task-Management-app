import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TaskPage from "./pages/TaskPage";
import Edit from "./pages/Edit";
import Add from "./pages/Add";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />}></Route>
          <Route exact path="/register" element={<Register />}></Route>
          <Route exact path="/tasks" element={<TaskPage />}></Route>
          <Route exact path="/edit/:id" element={<Edit />}></Route>
          <Route exact path="task/add" element={<Add />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
