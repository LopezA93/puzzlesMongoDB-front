import { useFormik } from "formik";
import * as yup from "yup";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/joy/TextField";
import { Container } from "@mui/material";
import { getUser } from "../../services/db";
import { useEffect, useState } from "react";
import "./style/forms.scss";
import { useNavigate } from "react-router-dom";
import CircularIndeterminate from "../CircularProgress/Circular";

const FormLogin = () => {
  const [error, setError] = useState(null);
  const [user, setUser] = useState();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
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
      setError(null);
      setLoading(true);
      const response = await getUser(values);
      setUser(response.data);
      localStorage.setItem("login", JSON.stringify(response.data));

      navigate("/profile");
    } catch (error) {
      console.log(error.response.data.message);
      setError(error.response.data.message);
    } finally {
      setLoading(false);
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
      <span className="errForm">{error ? error : ""}</span>

      
        {user ? (
          navigate("/profile")

        ) : loading ? (
          <CircularIndeterminate />
          ) : (
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
          </>
        )}
      
    </Container>
  );
};
export default FormLogin;
