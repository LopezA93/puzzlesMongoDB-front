import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getMessages, postMessage } from "../../services/db";
import Mensajes from "./MensajesCard";
import io from "socket.io-client";
import { Container } from "@mui/material";
const socket = io.connect("http://localhost:8081");
const MensajesContainer = () => {
  // const {
  //   data: mensajes,
  //   error,
  //   isLoading,
  //   refetch,
  // } = useQuery(["mensajes"], getMessages, {
  //   // refetchInterval:200
  
  // });

  const [mensajes, setMensajes] = useState([]);
  const [newMensaje, setNewMensaje] = useState("");
  // const [loading, setLoading] = useState(null)
  const getData = async () => {
    const response = await getMessages();
     return setMensajes(response);
  };

  useEffect(() => {
    socket.on("message", getData());
    // refetch()
    // return () => {
    //   socket.off("message", getData());
    // };
  }, [[], mensajes]);

  const userJSON = localStorage.getItem("login");
  const user = JSON.parse(userJSON);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newMsj = {
      email: user.user,
      texto: newMensaje,
    };
    const send = await postMessage(newMsj);
    // console.log(newMsj);
    // refetch()
    setNewMensaje("");
  };

  // if (isLoading) return "Cargando mensajes...";
  // if (error) return "Ha ocurrido un error: " + error.message;

  return (
    <> {
      !user ? ('Debe loguearse para ingresar a esta ruta' ) :
    
      
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
