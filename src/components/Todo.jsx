import React, { useState } from "react";
import { Fab, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export const TodoList = ({
  todo,
  i,
  setFakeState,
  setTodos,
  setShowTodo,
  setShowAlertList,
}) => {
  const [indexTodo, setIndexTodo] = useState(null);
  const [todoValue, setTodoValue] = useState("");
  const [edit, setEdit] = useState(null);
  const [editValue, setEditValue] = useState("");

  async function sendTodo(id) {
    const objTodo = {
      todo_list: id,
      name: todoValue,
    };
    try {
      const response = await fetch("http://dev1.itpw.ru:8083/todo/tasks/", {
        method: "POST",
        headers: {
          Date: "Wed, 22 Jun 2022 11:07:17 GMT",
          "Content-Type": "application/json",
          "Content-Length": "141",
          Authorization: `Bearer ${localStorage.token}`,
        },
        body: JSON.stringify(objTodo),
      });
      const data = await response.json();
      setTodoValue("");
    } catch (error) {
      console.log(error);
    } finally {
      setFakeState((prev) => prev + 1);
      setIndexTodo(null);
    }
  }

  async function editTask(id) {
    const objEditTodoList = {
      name: editValue,
    };
    try {
      const response = await fetch(
        `http://dev1.itpw.ru:8083/todo/lists/${id}/`,
        {
          method: "PUT",
          headers: {
            Date: "Wed, 22 Jun 2022 11:07:17 GMT",
            "Content-Type": "application/json",
            "Content-Length": "141",
            Authorization: `Bearer ${localStorage.token}`,
          },
          body: JSON.stringify(objEditTodoList),
        }
      );
      const data = await response.json();
      setEditValue("");
      setEdit(null);
    } catch (error) {
      console.log(error);
    } finally {
      setFakeState((prev) => prev + 1);
    }
  }

  async function deleteTodo(id) {
    setShowAlertList(true);

    try {
      const response = await fetch(
        `http://dev1.itpw.ru:8083/todo/lists/${id}/`,
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
      setTodos((prev) => prev.filter((item) => item.id !== id));
      const data = await response.json();
    } catch (error) {
      console.log(error);
    } finally {
      setFakeState((prev) => prev + 1);
      setTimeout(() => setShowAlertList(false), 1000);
    }
  }

  function clickShowTodo() {
    setShowTodo(i);
  }
  if (edit === i) {
    return (
      <div>
        <input
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          type="text"
        />
        <button onClick={() => editTask(todo.id)}>сохранить</button>
        <button onClick={() => setEdit(null)}>отменить</button>
      </div>
    );
  }

  return (
    <div onClick={() => clickShowTodo(i)}>
      <li
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "40px",
        }}
      >
        {todo.name}
        <Fab
          size="small"
          onClick={() => setIndexTodo(i)}
          color="secondary"
          aria-label="add"
        >
          <AddIcon />
        </Fab>
        <Fab
          size="small"
          onClick={() => setEdit(i)}
          color="secondary"
          aria-label="edit"
        >
          <EditIcon />
        </Fab>
        <IconButton
          onClick={() => deleteTodo(todo.id)}
          aria-label="delete"
          size="large"
        >
          <DeleteIcon fontSize="inherit" />
        </IconButton>
      </li>
      {indexTodo === i && (
        <div>
          <input
            value={todoValue}
            onChange={(e) => setTodoValue(e.target.value)}
          />
          <button onClick={() => sendTodo(todo.id)}>сохранить</button>
        </div>
      )}
    </div>
  );
};
