import { Container, Grid } from "@mui/material";

import { getProfile,  } from "../../services/db";

import { authData } from "../../services/authJWT";
import { useQuery } from "react-query";
import BtnLogout from "./Logout";
import Orders from "./Orders";
import './style/profile.scss'
import ErrorModal from "../Modals/ErrorModals";
import CircularIndeterminate from "../CircularProgress/Circular";
const ProfileUser = () => {


    const data = async () => {
        const res = await getProfile()
        return authData()
    }
    const {
      data: user,
      error,
      isLoading,
      
    } = useQuery(["user"], data, {
      cacheTime:1000,
      retry:1,

    });
  
    if (isLoading) return <CircularIndeterminate/>;
  
    if (error) {  
    localStorage.removeItem("login");

    return <ErrorModal texto={'Credenciales invalidas'} subtexto={'Por favor vuelva a ingresar.'}
    colorBtn={'secondary'}/>
  }



  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <h2>Datos Personales</h2>
          <div>
            <p><span style={{fontWeight:"bolder"}}>Nombre</span>: {user.nombre}</p>
            <p><span style={{fontWeight:"bolder"}}>Email:</span> {user.email}</p>
            <p><span style={{fontWeight:"bolder"}}>Direccion:</span> {user.direccion}</p>
            <p><span style={{fontWeight:"bolder"}}>Télefono: </span>{user.telefono}</p>
          </div>
        </Grid>
        <Grid item xs={7}>
          <h2>Compras realizadas</h2>
         
            <Orders/>
         
        </Grid>
        <Grid item xs={1}>
          <BtnLogout/>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProfileUser;
