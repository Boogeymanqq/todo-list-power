import React from "react";
import { Button, TextField, Container } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { TodoList } from "../components/Todo";
import { Tasks } from "../components/Tasks";
import { useNavigate } from "react-router-dom";

export const MainTodo = () => {
  const navigate = useNavigate();
  const [isShow, setIsShow] = useState(false);
  const [listValue, setListValue] = useState("");
  const [todos, setTodos] = useState([]);
  const [todoTasks, setTodoTasks] = useState([]);
  const [fakeState, setFakeState] = useState(0);

  async function createTodoList() {
    const objTodo = { name: listValue };
    try {
      const response = await fetch("http://dev1.itpw.ru:8083/todo/lists/", {
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
      console.log(data);
      setListValue("");
    } catch (error) {
      console.log(error);
    } finally {
      setFakeState((prev) => prev + 1);
      setIsShow(false);
    }
  }

  useEffect(() => {
    async function getTodo() {
      try {
        const response = await fetch("http://dev1.itpw.ru:8083/todo/lists/", {
          method: "GET",
          headers: {
            Date: "Wed, 22 Jun 2022 11:07:17 GMT",
            "Content-Type": "application/json",
            "Content-Length": "141",
            Authorization: `Bearer ${localStorage.token}`,
          },
        });
        const data = await response.json();
        setTodos(data);
      } catch (error) {
        console.log(error);
      }
    }
    getTodo();

    async function getTasks() {
      try {
        const response = await fetch("http://dev1.itpw.ru:8083/todo/tasks/", {
          method: "GET",
          headers: {
            Date: "Wed, 22 Jun 2022 11:07:17 GMT",
            "Content-Type": "application/json",
            "Content-Length": "141",
            Authorization: `Bearer ${localStorage.token}`,
          },
        });
        const data = await response.json();
        setTodoTasks(data);
      } catch (error) {
        console.log(error);
      }
    }
    getTasks();
  }, [fakeState]);

  function exit() {
    navigate("/login");
    localStorage.clear();
  }

  return (
    <Container maxWidth="sl">
      <h1>Ваш логин {localStorage.getItem("login")}</h1>
      <Button onClick={exit} variant="outlined" color="error">
        Выйти из аккаунта
      </Button>
      <div
        style={{
          margin: "150px auto",
          width: "800px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <>
          <Button
            onClick={() => setIsShow(!isShow)}
            variant="contained"
            disableElevation
          >
            Создать новый список задач
          </Button>
          {isShow && (
            <div style={{ marginTop: "20px", display: "flex" }}>
              <TextField
                value={listValue}
                onChange={(e) => setListValue(e.target.value)}
                id="standard-basic"
                label="Name task-list"
                variant="standard"
              />
              <Button
                onClick={createTodoList}
                variant="contained"
                color="success"
              >
                Создать
              </Button>
            </div>
          )}
        </>
        {todos && (
          <ul
            style={{
              display: "flex",
              justifyContent: "space-between",
              listStyle: "none",
              padding: 0,
              width: "100%",
              gap: "20px",
            }}
          >
            {todos.map((todo, i) => (
              <div key={todo.id}>
                <TodoList
                  todo={todo}
                  i={i}
                  setFakeState={setFakeState}
                  setTodos={setTodos}
                />
                <ul
                  style={{
                    marginTop: "30px",
                    padding: 0,
                    listStyle: "none",
                    border: "1px solid grey",
                  }}
                >
                  {todoTasks.map(
                    (task, i) =>
                      todo.id === task.todo_list && (
                        <Tasks
                          key={task.id}
                          i={i}
                          task={task}
                          setTodoTasks={setTodoTasks}
                          setFakeState={setFakeState}
                        />
                      )
                  )}
                </ul>
              </div>
            ))}
          </ul>
        )}
      </div>
    </Container>
  );
};
