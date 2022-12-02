import { Container, Grid, useRadioGroup } from "@mui/material";
import { useEffect, useState } from "react";
import { getProfile,  } from "../../services/db";
import { useNavigate } from "react-router-dom";
import { authData } from "../../services/authJWT";
import { useQuery } from "react-query";
import BtnLogout from "./Logout";
import Orders from "./Orders";
import './style/profile.scss'
import ErrorModal from "../Modals/ErrorModals";
import CircularIndeterminate from "../CircularProgress/Circular";
const ProfileUser = () => {
  // const [ordenes, setOrdenes] = useState([]);
//   const [user, setUser] = useState();
  const navigate = useNavigate()
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
      // refetchInterval:3000
    });
  
    if (isLoading) return <CircularIndeterminate/>;
  
    if (error) {  
    localStorage.removeItem("login");
    // alert("Credenciales invalidas, por favor vuelva a ingresar.");
    // navigate('/login')
    return <ErrorModal/>
  }
//   const datos = () => {
//     const loged = JSON.parse(localStorage.getItem("login"));
//     return setUser(loged)
//     // console.log(loged)
//   }
    
  
//   useEffect(()=> {
    
//     const data = async () => {
//         try {
//             const res = await getProfile()
//             datos()
//         } catch (error) {
//             console.log('error', 'credenciales invalidas')
//             navigate('/login')
//         }
//     }
//     data()
//     // setUser(authData)
//     // console.log('user', user)
//   },[])


  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <h2>Datos Personales</h2>
          {/* <div >
                <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"/>
            </div> */}
          <div>
            <p><span style={{fontWeight:"bolder"}}>Nombre</span>: {user.nombre}</p>
            <p><span>Email:</span> {user.email}</p>
            <p><span>Direccion:</span> {user.direccion}</p>
            <p><span>Télefono: </span>{user.telefono}</p>
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
