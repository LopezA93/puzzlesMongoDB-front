import { Button, Container } from "@mui/material";
import { Link } from "react-router-dom";
import ProfileAdmin from "../components/Profile/Admin/ProfileAdmin";
import ProfileUser from "../components/Profile/Profile";

import { authData } from "../services/authJWT";
const Profile = () => {
  

  const user = authData();

  return (
    <>
      {" "}
      {!user ? (
        <Container>
          <h1>Debe ingresar para entrar en esta sección.</h1>{" "}
          <Link to={"/login"}>
            <Button>Login</Button>
          </Link>
        </Container>
      ) : user.role !== "admin" ? (
        <ProfileUser />
      ) : (
        <ProfileAdmin />
      )}
    </>
  );
};
export default Profile;
