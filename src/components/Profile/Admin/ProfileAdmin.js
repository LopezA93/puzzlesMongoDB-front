import { Container, Grid, useRadioGroup } from "@mui/material";
import { useEffect, useState } from "react";
import { getProfile } from "../../../services/db";
import { useNavigate } from "react-router-dom";
import { authData } from "../../../services/authJWT";
import { useQuery } from "react-query";
import BtnLogout from "../Logout";
import Orders from "../Orders";
import ErrorModal from "../../Modals/ErrorModals";
import CircularIndeterminate from "../../CircularProgress/Circular";
import FormPostProduct from "./FormPostProduct";
import ProdsList from "./ProdsList";
const ProfileAdmin = () => {
  // const [ordenes, setOrdenes] = useState([]);
  //   const [user, setUser] = useState();
  const navigate = useNavigate();
  const data = async () => {
    const res = await getProfile();
    return authData();
  };
  const {
    data: userAdmin,
    error,
    isLoading,
  } = useQuery(["userAdmin"], data, {
    cacheTime: 1000,
    retry: false,


  });

  if (isLoading) return <CircularIndeterminate />;

  if (error) {
    localStorage.removeItem("login");

    return (
      <ErrorModal
        texto={"Credenciales invalidas"}
        subtexto={"No tiene permisos para esta sección."}
        colorBtn={"secondary"}
      />
    );
  }

  return (
    <>
      {userAdmin.role !== "admin" ? (
        <ErrorModal
          texto="Credenciales invalidas"
          subtexto="No tiene permisos para esta sección."
          colorBtn="secondary"
        />
      ) : (
        <Container>
          <h1>Admin profile</h1>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={7}>
              <ProdsList />
            </Grid>
            <Grid item xs={12} sm={4}>
              <h1>Ingresar nuevo producto</h1>
              <FormPostProduct />
            </Grid>
            <Grid item xs={12} sm={6}>
              <BtnLogout />
            </Grid>
          </Grid>
        </Container>
      )}
    </>
  );
};

export default ProfileAdmin;
