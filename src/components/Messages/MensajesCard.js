const Mensajes = ({ props }) => {
    const { email, texto, fecha} = props;
    let date = new Date(fecha)
    return <div> <p style={{fontWeight:'bolder' }}>{email}:</p>  <span >{texto}</span> <span style={{color:'red', fontStyle:'italic'}}>{date.toLocaleString()}</span></div>;
  };
  
  export default Mensajes;