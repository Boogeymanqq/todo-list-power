import React, { useState } from "react";
import { Fab, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export const Tasks = ({ task, i, setTodoTasks, setFakeState }) => {
  const [edit, setEdit] = useState(null);
  const [editValue, setEditValue] = useState("");

  async function deleteTask(id) {
    try {
      const response = await fetch(
        `http://dev1.itpw.ru:8083/todo/tasks/${id}/`,
        {
          method: "DELETE",
          headers: {
            Date: "Wed, 22 Jun 2022 11:07:17 GMT",
            "Content-Type": "application/json",
            "Content-Length": "141",
            Authorization: `Bearer ${localStorage.token}`,
          },
        }
      );
      setTodoTasks((prev) => prev.filter((item) => item.id !== id));
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setFakeState((prev) => prev + 1);
    }
  }

  async function editTask(id, idList) {
    const objEditTask = {
      todo_list: idList,
      name: editValue,
    };
    try {
      const response = await fetch(
        `http://dev1.itpw.ru:8083/todo/tasks/${id}/`,
        {
          method: "PUT",
          headers: {
            Date: "Wed, 22 Jun 2022 11:07:17 GMT",
            "Content-Type": "application/json",
            "Content-Length": "141",
            Authorization: `Bearer ${localStorage.token}`,
          },
          body: JSON.stringify(objEditTask),
        }
      );
      const data = await response.json();
      console.log(data);
      setTodoTasks((prev) =>
        prev.map((item) => {
          if (item.id === id) {
            item.name = editValue;
          }
          return item;
        })
      );
      setEditValue("");
      setEdit(null);
    } catch (error) {
      console.log(error);
    } finally {
      setFakeState((prev) => prev + 1);
    }
  }

  async function comletedTask(id) {
    try {
      const response = await fetch(
        `http://dev1.itpw.ru:8083/todo/tasks/complete/${id}/`,
        {
          method: "POST",
          headers: {
            Date: "Wed, 22 Jun 2022 11:07:17 GMT",
            "Content-Type": "application/json",
            "Content-Length": "141",
            Authorization: `Bearer ${localStorage.token}`,
          },
        }
      );
      const data = await response.json();
    } catch (error) {
      console.log(error);
    } finally {
      setFakeState((prev) => prev + 1);
    }
  }

  if (edit === i) {
    return (
      <div>
        <input
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          type="text"
        />
        <button onClick={() => editTask(task.id, task.todo_list)}>
          сохранить
        </button>
        <button onClick={() => setEdit(null)}>отменить</button>
      </div>
    );
  }

  return (
    <li
      style={{
        fontSize: "20px",
        display: "flex",
        alignItems: "center",
        padding: "5px",
        justifyContent: "space-between",
        gap: "10px",
        borderBottom: "1px solid grey",
      }}
    >
      <div
        style={
          task.completed
            ? {
                cursor: "pointer",
                width: "18px",
                height: "18px",
                display: "inline-block",
                backgroundColor: "green",
                border: "1px solid #000",
                borderRadius: "50%",
              }
            : {
                cursor: "pointer",
                width: "18px",
                height: "18px",
                display: "inline-block",
                border: "1px solid #000",
                borderRadius: "50%",
              }
        }
        onClick={() => comletedTask(task.id)}
      ></div>
      <p
        style={
          task.completed
            ? { textDecoration: "line-through", margin: 0 }
            : { margin: 0 }
        }
      >
        {task.name}
      </p>
      <div>
        <Fab
          size="small"
          onClick={() => setEdit(i)}
          color="secondary"
          aria-label="edit"
        >
          <EditIcon />
        </Fab>
        <IconButton
          onClick={() => deleteTask(task.id)}
          aria-label="delete"
          size="large"
        >
          <DeleteIcon fontSize="inherit" />
        </IconButton>
      </div>
    </li>
  );
};
