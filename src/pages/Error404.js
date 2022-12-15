import { Link } from "react-router-dom"
import { Container } from "@mui/material"
const Error404 = () => {
    return ( <Container>
        <h1>Error 404!</h1>
        <h3>Ruta no ingresada, por favor vuelva al inicio</h3>
        <Link to={'/'}>Home</Link>
    </Container>)
}

export default Error404