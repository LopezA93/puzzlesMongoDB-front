import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import * as React from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
const OrderModal = ({ texto, subtexto, colorBtn, order, total }) => {
  const rootRef = React.useRef(null);
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: 650,
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
            {texto}
          </Typography>
          <Typography id="server-modal-description" sx={{ pt: 2 }}>
            {subtexto}
          </Typography>
          <Link to={"/"}>
            {" "}
            <Button sx={{marginTop:"1rem"}} variant="contained" color={colorBtn}>
              {" "}
              Cerrar
            </Button>
          </Link>
          <form action="https://puzzles-bar.vercel.app/mercadopago" method="POST">
            <input type="hidden" name="title" value={order} />
            <input type="hidden" name="price" value={total} />
            <Button sx={{marginTop:"1rem"}} color='success' variant="contained" type="submit" value="Pagar">
              Pagar
            </Button>
          </form>
        </Box>
      </Modal>
    </Box>
  );
};
export default OrderModal;
