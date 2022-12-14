import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@mui/material/Button";
import TextField from "@mui/joy/TextField";
import { Container } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";
import CircularIndeterminate from "../CircularProgress/Circular";
import { signUp } from "../../services/db";
import "./style/forms.scss";

const FormSignup = () => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
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
    nombre: yup.string("Enter your name").required("Fullname is required"),
    direccion: yup.string("Enter your adress").required("Adress is required"),
    ciudad: yup.string("Enter your city").required("City is required"),
    telefono: yup
      .number("Enter your Phone number")
      .required("Phone number is required"),
  });

  const onSubmit = async (values) => {
    try {
      setLoading(true);
      setError(null);
      const response = await signUp(values).catch((err) => {
        if (err && err.response) {
          console.log("error", err.response.data.message);
          setError(err.response.data.message);
        }
      });

      if (response) {
        setSuccess(response.data.message);
        localStorage.setItem("x-auth-token", response.data.token);
        setError(null);
        formik.resetForm();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      nombre: "",
      email: "",
      password: "",
      direccion: "",
      ciudad: "",
      telefono: "",
    },
    validationSchema: validationSchema,
    onSubmit,
  });

  return (
    <Container className="boxSignup" fixed>
      <div className="errForm">{!success ? error : success}</div>
      {loading ? (
        <CircularIndeterminate />
      ) : (
        <>
          <h1>Signup</h1>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              id="nombre"
              name="nombre"
              label="Nombre completo"
              value={formik.values.nombre}
              onChange={formik.handleChange}
              error={formik.touched.nombre && Boolean(formik.errors.nombre)}
              helperText={formik.touched.nombre && formik.errors.nombre}
            />
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
            <TextField
              id="direccion"
              name="direccion"
              label="Direccion"
              value={formik.values.direccion}
              onChange={formik.handleChange}
              error={
                formik.touched.direccion && Boolean(formik.errors.direccion)
              }
              helperText={formik.touched.direccion && formik.errors.direccion}
            />
            <TextField
              id="ciudad"
              name="ciudad"
              label="Ciudad"
              value={formik.values.ciudad}
              onChange={formik.handleChange}
              error={formik.touched.ciudad && Boolean(formik.errors.ciudad)}
              helperText={formik.touched.ciudad && formik.errors.ciudad}
            />
            <TextField
              id="telefono"
              name="telefono"
              label="Telefono"
              value={formik.values.telefono}
              onChange={formik.handleChange}
              error={formik.touched.telefono && Boolean(formik.errors.telefono)}
              helperText={formik.touched.telefono && formik.errors.telefono}
            />
            <Button
              className="btnSignup"
              color="error"
              variant="contained"
              type="submit"
            >
              Signup
            </Button>
          </form>
          <Link className="link" to="/login">
            Si ya tenes cuenta, ingresa aqu??
          </Link>
        </>
      )}
    </Container>
  );
};
export default FormSignup;
