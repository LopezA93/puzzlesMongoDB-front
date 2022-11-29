
import { useFormik } from "formik";
import * as yup from "yup";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/joy/TextField";
import { Container } from "@mui/material";
import { getToken, getUser, logout } from "../../services/db";
import { useEffect, useState } from "react";
import "./style/login.scss";
import { useNavigate } from "react-router-dom";



const FormLogin = () => {
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null || {});
  const navigate = useNavigate()

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
  useEffect(() => {
    const loggedUserJSON = localStorage.getItem("login");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, []);
  const onSubmit = async (values) => {
    // const { token } = user;
    // const token = await getToken(user)
    // console.log('token', token)
    // const config = {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // };
    // .catch((err) => {
    //   if (err) {
    //     console.log("error", err.response.data.message);
    //     setError(err.data.message);
    //   }
    // });
    // const response = await axios
    //   .post(`${url}/users/login`, values)
    //   .catch((err) => {
    //     if (err && err.response) {
    //       console.log("error", err.response.data.message);
    //       setError(err.response.data.message);
    //     }
    //   });
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
    // if (response) {

    // } else {
    //   console.log("error")
    // }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit,
  });

  const Logout = async () => {
    const response = await logout();
    console.log(response.data);
    localStorage.removeItem("login");
    setUser("");
  };
  return (
    <Container className="boxLogin">
      <div>{error ? error : ""}</div>
      <div>
        {user.email ? (
          navigate('/profile')
          // <>
          //   Bienvenido {user.nombre}
          //   <Button onClick={Logout}>Logout</Button>
          // </>
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

            <Link to='/signup'>Registrate aquí</Link>

          </>
        )}
      </div>
    </Container>
  );
};
export default FormLogin;
