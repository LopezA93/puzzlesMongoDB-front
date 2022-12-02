import { useFormik } from "formik";
import * as yup from "yup";
import { Link, redirect } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/joy/TextField";
import { Container } from "@mui/material";
import { getUser } from "../../services/db";
import { useEffect, useState } from "react";
import "./style/login.scss";
import { useNavigate } from "react-router-dom";

const FormLogin = () => {
  const [error, setError] = useState(null);
  const [user, setUser] = useState();
  const navigate = useNavigate();

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
  
  const onSubmit = async (values) => {
    try {
      const response = await getUser(values);
      setUser(response.data);
      localStorage.setItem("login", JSON.stringify(response.data));
      console.log(response);
      setError(null);
      navigate("/profile");

    } catch (error) {
      console.log(error.response.data.message);
      setError(error.response.data.message);
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
  useEffect(() => {
    const loggedUserJSON = localStorage.getItem("login");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      return;
    }
  
  }, []);
  return (
    <Container className="boxLogin">
      <div>{error ? error : ""}</div>
      <div>
        {user? (navigate('/profile')) : (
         
          <>
            <h1>Login</h1>
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
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
              <Button
                className="btnLogin"
                color="success"
                variant="contained"
                type="submit"
              >
                Login
              </Button>
            </form>

            <Link className="link" to="/signup">
              Registrate aquí
            </Link>
          </>)}
        
      </div>
    </Container>
  );
};
export default FormLogin;
