import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import * as React from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CartContext from "../../context/CartContext";
import { useContext } from "react";
import { saveCart } from "../../services/db";
const CartModal = () => {
  const rootRef = React.useRef(null);
  const navigate = useNavigate();

  const {cartProducts, total} = useContext(CartContext)
  const newCart = async () => {
    
    const user = JSON.parse(localStorage.getItem("login"));
    const email = user.email;
    const values = {
      email: email,
      productos: cartProducts,
      total: total()

    }
    const response = await saveCart(values)

  }

  return (
    <>

    <Box
      sx={{
        height: 600,
        flexGrow: 1,
        minWidth: 300,
        transform: "translateZ(0)",
        "@media all and (-ms-high-contrast: none)": {
          display: "none",
        },
      }}
      
      ref={rootRef}
    >
      <Modal
        disablePortal
        disableEnforceFocus
        disableAutoFocus
        open
        aria-labelledby="server-modal-title"
        aria-describedby="server-modal-description"
        sx={{
          display: "flex",
          p: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
        container={() => rootRef.current}
      >
        <Box
          sx={{
            position: "relative",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: (theme) => theme.shadows[5],
            p: 4,
          }}
        >
          <Typography id="server-modal-title" variant="h6" component="h2">
            Producto añadido al carro
          </Typography>
          <Typography id="server-modal-description" sx={{ pt: 2 }}>
            <ShoppingCartIcon/>
          </Typography>
          <Link to={"/products"}>
            {" "}
            <Button variant="contained" sx={{ margin:1 }} color="primary">
              {" "}
              Seguir comprando
            </Button>
          </Link>
          <Link to={"/cart"}>
            {" "}
            <Button variant="contained" color="success" sx={{ margin:1 }} onClick={newCart}
            >
              {" "}
              Ir al carrito
            </Button>
          </Link>
        </Box>
      </Modal>
    </Box>
    </>
  );
};
export default CartModal;
