import { useEffect, useState } from "react";

import { getMessages, postMessage } from "../../services/db";
import Mensajes from "./MensajesCard";
import io from "socket.io-client";
import { Container, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
const MensajesContainer = () => {
const socket = io.connect("http://localhost:8081/");

  const [mensajes, setMensajes] = useState([]);
  const [newMensaje, setNewMensaje] = useState("");

  const getData = async () => {
    const response = await getMessages();
    response.reverse();

    return setMensajes(response);

  };

  useEffect(() => {
    socket.on("message", getData());
  }, [[], mensajes]);

  const userJSON = localStorage.getItem("login");
  const user = JSON.parse(userJSON);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newMsj = {
      email: user.email,
      texto: newMensaje,
    };
    const send = await postMessage(newMsj);

    setNewMensaje("");
  };

  return (
    <>
      {" "}
      {!user ? (
        <>
          <h1>
            Debe loguearse para ingresar a esta ruta, por favor ingrese aquí{" "}
          </h1>
          <Link to={"/login"}>
            {" "}
            <Button color={"primary"} variant={"outlined"}>
              Login
            </Button>
          </Link>
        </>
      ) : (
        <>
          {" "}
          <Container className="boxMsj">
            <h1>Mensajes</h1>
            
            <div className="mensajes">
              {mensajes.map((item, index) => {
                return <Mensajes key={index} props={item} />;
              })}
            </div>
          </Container>
          <Container display="flex">
            <form onSubmit={handleSubmit}>
              <p> Usuario:{user.email}</p>
              <TextField
                type="text"
                name="newMensaje"
                id="newMensaje"
                required
                value={newMensaje}
                onChange={(e) => setNewMensaje(e.target.value)}
              />
              <div>
              <Button variant="outlined" type="submit">Enviar</Button>
              </div>
            </form>
          </Container>
        </>
      )}
    </>
  );
};

export default MensajesContainer;
