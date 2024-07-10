import React from 'react';
import { MdDelete, MdModeEdit } from 'react-icons/md';
import { Link } from 'react-router-dom';

const Task = ({ title, description, type, id, edit, deleteTask }) => {
  return (
    <div className="task">
      <h3>{title}</h3>
      <p className="description">{description}</p>
      <div>
        <div className="icon-container">
          <p>{type}</p>
          <span className="icon" onClick={() => deleteTask(id)}>
            <MdDelete size={25} color="white" />
          </span>
          <Link to={edit}>
            <span className="icon" >
              <MdModeEdit color="white" size={25} />
            </span>
          </Link>
        </div>
        <p></p>
      </div>
    </div>
  );
};

export default Task;
