import React, { useState, useEffect } from "react";
import api from "../api";
import { Link, useNavigate, useParams } from "react-router-dom";

const Edit = () => {
  const { id } = useParams();
  const [task, setTask] = useState({
    title: "",
    description: "",
    type: "",
  });
  const navigate = useNavigate();
  const { title, description, type } = task;

  useEffect(() => {
    loadTask();
  }, []);

  const onInputChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const loadTask = async () => {
    try {
      const result = await api.get(`/tasks/single/${id}`);
      console.log(result.data);
      setTask(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateTask = async (e) => {
    try {
      e.preventDefault();
      await api.patch(`/tasks/${id}`, task);
      navigate("/tasks");
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div>
      <h1>Edit task</h1>
      <center>
        <div className="container">
          <div className="sub-container">
            <h2>Edit Your Task</h2>
            <form onSubmit={(e) => updateTask(e)}>
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

export default Edit;
