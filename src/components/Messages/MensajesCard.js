
const Mensajes = ({ props }) => {
  const { email, texto } = props;
  return <div> <span>{email}</span> <span>{texto}</span></div>;
};

export default Mensajes;
