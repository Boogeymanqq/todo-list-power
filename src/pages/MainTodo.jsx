import React from "react";
import { Alert, AlertTitle, Button, TextField, Container } from "@mui/material";
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
  const [showTodo, setShowTodo] = useState(null);
  const [showAlertList, setShowAlertList] = useState(false);
  const [showAlertTask, setShowAlertTask] = useState(false);

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
      {showAlertTask && (
        <div style={{ width: "300px", margin: "0 auto" }}>
          <Alert variant="filled" severity="error">
            Вы удалили задачу
          </Alert>
        </div>
      )}
      {showAlertList && (
        <div style={{ width: "300px", margin: "0 auto" }}>
          <Alert variant="filled" severity="error">
            Вы удалили список задач!!!
          </Alert>
        </div>
      )}
      <div
        style={{
          margin: "100px auto",
          width: "800px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "100px",
          }}
        >
          <h1 style={{ margin: 0, color: "#800000" }}>
            Ваш логин: {localStorage.getItem("login")}
          </h1>
          <Button onClick={exit} variant="outlined" color="error">
            Выйти из аккаунта
          </Button>
        </div>
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
              listStyle: "none",
              padding: 0,
              width: "100%",
            }}
          >
            {todos.map((todo, i) => (
              <div
                key={todo.id}
                style={{ marginBottom: "40px", border: "1px solid grey" }}
              >
                <TodoList
                  todo={todo}
                  i={i}
                  setFakeState={setFakeState}
                  setTodos={setTodos}
                  setShowTodo={setShowTodo}
                  setShowAlertList={setShowAlertList}
                />
                {showTodo === i && (
                  <ul
                    style={{
                      padding: 0,
                      listStyle: "none",
                      borderTop: "1px solid grey",
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
                            setShowAlertTask={setShowAlertTask}
                          />
                        )
                    )}
                  </ul>
                )}
              </div>
            ))}
          </ul>
        )}
      </div>
    </Container>
  );
};
