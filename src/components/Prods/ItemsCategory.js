import { Button } from "@mui/material";
import { useEffect } from "react";
import { getProductsByCategory } from "../../services/db";
import { useQuery } from "react-query";
import CircularIndeterminate from "../CircularProgress/Circular";
import ProdCard from "./Items";
import { Link, useParams } from "react-router-dom";
import { Grid } from "@mui/material";
import { Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { authData } from "../../services/authJWT";
const NavCategory = () => {
  const { category } = useParams();

  const navigate = useNavigate();
  const response = async () => {
    const { data } = await getProductsByCategory(category).catch((err) =>
      console.log(err)
    );
    return data;
  };

  const {
    data: prodsCategory,
    error,
    isLoading,
  } = useQuery(["prodsCategory"], response);

  if (isLoading) return <CircularIndeterminate />;

  if (error) return "Ha ocurrido un error: " + error.message;
  const user = authData()

  return (
    <>
      {!user ? (
        <>
        <Container>
          <h1>
            Debe loguearse para ingresar a esta ruta, por favor ingrese aquí{" "}
          </h1>
          <Link to={"/login"}>
            {" "}
            <Button color={"primary"} variant={"outlined"}>
              Login
            </Button>
          </Link>
          </Container>
        </>
      ) : prodsCategory.length === undefined ? (
        navigate("/404")
      ) : (
        <Container>
          <h1>{category.toUpperCase()}</h1>
          <Link to={"/products"}>
            {" "}
            <Button variant="outlined" color="primary">
              Volver
            </Button>
          </Link>
          <Grid container spacing={2}>
            {prodsCategory.map((item, index) => (
              <ProdCard key={index} prod={item} />
            ))}
          </Grid>
        </Container>
      )}
    </>
  );
};

export default NavCategory;
