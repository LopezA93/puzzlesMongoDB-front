import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@mui/material/Button";
import TextField from "@mui/joy/TextField";
import { Container } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import './style/login.scss'
const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

const FormSignup = () => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const onSubmit = async (values) => {
    const url = "http://localhost:8081";

    const response = await axios
      .post(`${url}/users/signup`, values)
      .catch((err) => {
        if (err && err.response) {
          console.log("error", err.response.data.message);
          setError(err.response.data.message);
        }
      });

    if (response) {
      setSuccess(response.data.message);
      console.log("response", response);
      localStorage.setItem("x-auth-token", response.data.token);

      setError(null);
      formik.resetForm()
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit,
  });

  return (
    <Container className ='boxSignup'>
      <div>{!success ? error : success}</div>
      <h1>Signup</h1>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          id="password"
          name="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <Button className='btnSignup' color="error" variant="contained" type="submit">
          Signup
        </Button>
      </form>
      <Link className='link'to='/login'>Si ya tenes cuenta, ingresa aquí</Link>

    </Container>
  );
};
export default FormSignup;
