import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { object, string } from "yup";
import { useState } from "react";

export const SignIn = () => {
  const [status, setStatus] = useState("");
  const initialValues = {
    username: "",
    password: "",
  };

  const navigate = useNavigate();

  return (
    <div style={{ width: "500px", height: "300px", margin: "300px auto" }}>
      <h1 style={{ textAlign: "center" }}>Регистрация</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={object({
          username: string()
            .trim()
            .min(3, "Минимум 3 символа")
            .max(20, "Максимум 15 символов")
            .required("Пожалуйста, введите логин"),
          password: string()
            .trim()
            .required("Пожалуйста, введите пароль")
            .min(3, "Минимум 3 символов")
            .max(20, "Максимум 20 символов"),
        })}
        onSubmit={async (values, formikHelpers) => {
          console.log(JSON.stringify(values));
          try {
            const response = await fetch(
              "http://dev1.itpw.ru:8083/accounts/authentication/reg/",
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
            setStatus(data.detail);
            data.detail === "Пользователь зарегистрирован" &&
              setTimeout(() => navigate("/login"), 1000);
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
              error={Boolean(errors.username) && Boolean(touched.username)}
              helperText={Boolean(touched.username) && errors.username}
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
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Button
                //  sx={buttonStyled}
                type="submit"
                variant="contained"
                disabled={!dirty || !isValid}
              >
                OK
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
      {status === "Пользователь зарегистрирован" && (
        <h2>Пользователь зарегистрирован</h2>
      )}
      {status ===
        "Пользователь с такими учетными данными уже зарегистрирован в системе" && (
        <h2>
          Пользователь с такими учетными данными уже зарегистрирован в системе
        </h2>
      )}
    </div>
  );
};
