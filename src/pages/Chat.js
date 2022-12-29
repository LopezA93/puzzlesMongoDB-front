import MensajesContainer from "../components/Messages/MensajesContainer";
import Error404 from "./Error404";

const ChatPage = () => {
  const url = process.env.REACT_APP_BASE_URL;

  return url === "http://localhost:8081" ? <MensajesContainer />  :<Error404 /> ;
};

export default ChatPage;
