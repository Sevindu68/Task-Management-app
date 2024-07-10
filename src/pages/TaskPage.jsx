// TaskPage.js
import React, { useEffect, useState } from "react";
import api from "../api";
import { useNavigate, useParams,Link } from "react-router-dom";
import Task from "../components/Task";
import { FaRegUserCircle } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { AiFillPlusCircle } from "react-icons/ai";

const TaskPage = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    loadUser(); // Fetch all tasks initially
  }, []);

  const loadUser = async (taskType = "") => {
    try {
      const response = await api.get("/tasks/me", {
        params: { type: taskType }
      });
      setTasks(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
      if (error.message === "Request failed with status code 401") {
        navigate("/");
      }
    }
  };

  const logout = async () => {
    try {
      await api.post("/users/logout");
      localStorage.removeItem("token");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      loadUser(); // Reload all tasks after deletion
      alert("Record deleted successfully");
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="container-2">
      <div className="nav-bar">
        <center>
          <FaRegUserCircle className="user" size={70} />
        </center>
        <div className="list">
          <center className="element" onClick={() => loadUser("Important")}>
            <FaStar />
            Important
          </center>
          <center className="element" onClick={() => loadUser("Optional")}>
            <FaStar />
            Optional
          </center>
          <center className="element" onClick={() => loadUser("Personal")}>
            <FaStar />
            Personal
          </center>
        </div>
        <center>
          <FiLogOut size={40} className="icon" onClick={logout} />
        </center>
      </div>

      <div className="task-container">
        <div className="header">
          <h2 className="title">Your Tasks...</h2>
          <Link className="btn" to="/task/add">
           <span  >
            <AiFillPlusCircle size={30} /> Add New Task
          </span>
          </Link>
         
        </div>
        <hr />
        <div className="task-list">
          {tasks.length === 0 ? (
            <p>No tasks found</p>
          ) : (
            tasks.map((task) => (
              <Task
                key={task._id}
                id={task._id}
                title={task.title}
                description={task.description}
                type={task.type}
                deleteTask={deleteTask}
                edit={`/edit/${task._id}`}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskPage;
