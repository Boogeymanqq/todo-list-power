import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Box, TextField } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { object, string } from "yup";

export const Login = () => {
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const initialValues = {
    username: "",
    password: "",
  };

  return (
    <div style={{ width: "500px", height: "300px", margin: "300px auto" }}>
      <h1 style={{ textAlign: "center", color: "#800000" }}>Логинизация</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={object({
          username: string()
            .trim()
            .min(3, "Минимум 3 символа")
            .max(20, "Максимум 20 символов")
            .required("Пожалуйста, введите логин"),
          password: string()
            .trim()
            .required("Пожалуйста, введите пароль")
            .min(3, "Минимум 3 символов")
            .max(20, "Максимум 20 символов"),
        })}
        onSubmit={async (values, formikHelpers) => {
          try {
            const response = await fetch(
              "http://dev1.itpw.ru:8083/accounts/authentication/auth/",
              {
                method: "POST",
                headers: {
                  Date: "Wed, 22 Jun 2022 11:07:17 GMT",
                  "Content-Type": "application/json",
                  "Content-Length": "141",
                },
                body: JSON.stringify(values),
              }
            );
            const data = await response.json();
            localStorage.setItem("token", data.token);
            localStorage.setItem("login", data.user.username);
            setStatus(data.detail);
            data.user && setTimeout(() => navigate("/todolist"), 1000);
          } catch (error) {
            console.log(error);
          }
          formikHelpers.resetForm();
        }}
      >
        {({ errors, isValid, touched, dirty }) => (
          <Form>
            <Field
              name="username"
              type="username"
              as={TextField}
              variant="outlined"
              color="success"
              label="Логин"
              fullWidth
              error={Boolean(errors.login) && Boolean(touched.login)}
              helperText={Boolean(touched.login) && errors.login}
            />
            <Box height={10} />
            <Field
              name="password"
              type="password"
              as={TextField}
              variant="outlined"
              color="success"
              label="Пароль"
              fullWidth
              error={Boolean(errors.password) && Boolean(touched.password)}
              helperText={Boolean(touched.password) && errors.password}
            />
            <Box height={30} />
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Button
                type="submit"
                variant="contained"
                disabled={!dirty || !isValid}
              >
                OK
              </Button>
              <Button
                variant="outlined"
                disabled={!dirty || !isValid}
                onClick={() => navigate("/")}
              >
                Вернуться на главную (регистрацию)
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
      {status === "Неверный логин или пароль" && (
        <h2>Неверный логин или пароль</h2>
      )}
    </div>
  );
};
