import ProdCard from "./Items";
import { getProducts } from "../../services/db";
import { useQuery } from "react-query";
import CircularIndeterminate from "../CircularProgress/Circular";
import { Container, Box, Grid } from "@mui/material";
import "./styles/prodsContainer.scss";
import { authData } from "../../services/authJWT";
import { Link, useParams } from "react-router-dom";
import { Button } from "@mui/material";
const ItemListContainer = () => {
  const { data: prods, error, isLoading } = useQuery(["prods"], getProducts);

  if (isLoading) return <CircularIndeterminate />;

  if (error) return "Ha ocurrido un error: " + error.message;

  const categorys = ["cervezas", "comun", "aperitivo"];
  const user = authData();

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
      ) : (
        <Container>
          <h2>Productos</h2>
          <Grid>
            <h3>Categorias</h3>
            <ul className="ListCategory">
              {categorys.map((i, index) => {
                return (
                  <Link key={index} to={i}>
                    {" "}
                    <Button
                      className="btnCategory"
                      variant="outlined"
                      color="primary"
                    >
                      <li>{i}</li>
                    </Button>
                  </Link>
                );
              })}
            </ul>
          </Grid>
          <Grid container spacing={2}>
            {prods.map((item, index) => {
              return (
                <Grid key={index} item xs={12} md={6}>
                  <ProdCard prod={item} />
                </Grid>
              );
            })}
          </Grid>
        </Container>
      )}
    </>
  );
};

export default ItemListContainer;
