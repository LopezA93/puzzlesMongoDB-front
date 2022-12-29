import { Button } from "@mui/material";
import { Container } from "@mui/system";
import { Link } from "react-router-dom";


const Home = () => {
  return (
    <>
      <Container>
        <h1> Bienvenido a Puzzles, para continuar ingresa o registrate!</h1>
        <Link to={"/login"}> <Button variant='outlined'>Ingresar</Button> </Link>
        <Link to={"/signup"}><Button variant='outlined' color="warning">Registrate</Button></Link>
      </Container>
    </>
  );
};

export default Home;
