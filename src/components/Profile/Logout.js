import { useNavigate } from "react-router-dom";
import { logout } from "../../services/db";
import { Button } from "@mui/material";
const BtnLogout = () => {
  const navigate = useNavigate();

  const Logout = async () => {
    const response = await logout();
    // console.log(response.data);
    localStorage.removeItem("login");
    navigate("/login");
  };
  return (
    <Button className='btnLogout' variant="contained" color="error" onClick={Logout}>
      Logout
    </Button>
  );
};
export default BtnLogout;
