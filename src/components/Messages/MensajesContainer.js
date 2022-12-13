import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getMessages, postMessage } from "../../services/db";
import Mensajes from "./MensajesCard";
import io from "socket.io-client";
import { Container } from "@mui/material";
import { Link } from "react-router-dom";
import {Button} from "@mui/material";
const socket = io.connect("https://puzzles-bar.vercel.app");
const MensajesContainer = () => {
  

  const [mensajes, setMensajes] = useState([]);
  const [newMensaje, setNewMensaje] = useState("");

  const getData = async () => {
    const response = await getMessages();
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
    // console.log(newMsj);
    // refetch()
    setNewMensaje("");
  };

 

  return (
    <> {
      !user ? ( 
      <><h1>Debe loguearse para ingresar a esta ruta, por favor ingrese aquí </h1>
        <Link to={'/login'} > <Button color={'primary'} variant={'outlined'} >Login</Button></Link>
      </>) :
    
      
      <> <Container className='boxMsj'>
        <h1>
          Mensajes 
        </h1>
        
        <div className="mensajes">
          {mensajes.map((item, index) => {
            return <Mensajes key={index} props={item} />;
          })}
        </div>
      </Container>
      <Container display="flex">
        <form onSubmit={handleSubmit}>
          <div> Usuario:{user.user}</div>
          <input
            type="text"
            name="newMensaje"
            id="newMensaje"
            value={newMensaje}
            onChange={(e) => setNewMensaje(e.target.value)}
          />
          <button type="submit">Enviar</button>
        </form>
      </Container>
      </>
      }
    </>
  );
};

export default MensajesContainer;
