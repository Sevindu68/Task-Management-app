import React, { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    type: "Important",
  });
  const navigate = useNavigate();

  const { title, description, type } = task;

  const onInputChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const addTask = (e) => {
    try {
      e.preventDefault();
      api.post("/task", task);
      navigate("/tasks")
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Add task</h1>
      <center>
        <div className="container">
          <div className="sub-container">
            <h2>Add Your Task</h2>
            <form onSubmit={addTask}>
              <label htmlFor="title">Title</label>
              <input
                name="title"
                type="text"
                value={title}
                onChange={onInputChange}
              />
              <label htmlFor="description">Description</label>
              <input
                type="text"
                name="description"
                value={description}
                onChange={onInputChange}
              />
              <label htmlFor="type">Type</label>
              <select
                className="options"
                name="type"
                value={type}
                onChange={onInputChange}
              >
                <option value="Important">Important</option>
                <option value="Personal">Personal</option>
                <option value="Optional">Optional</option>
              </select>
              <center>
                <input type="submit" value="Submit" />
              </center>
            </form>
          </div>
        </div>
      </center>
    </div>
  );
};

export default Add;
