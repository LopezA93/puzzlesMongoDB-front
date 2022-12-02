import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import * as React from 'react';
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
const ErrorModal = () => {
  const rootRef = React.useRef(null);
  const navigate = useNavigate();
  

  return (
    <Box
      sx={{
        height: 600,
        flexGrow: 1,
        minWidth: 300,
        transform: "translateZ(0)",
        // The position fixed scoping doesn't work in IE11.
        // Disable this demo to preserve the others.
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
            Error en las credenciales
          </Typography>
          <Typography id="server-modal-description" sx={{ pt: 2 }}>
            Por favor vuelva a ingresar.
          </Typography>
          <Link to={'/login'}>
            {" "}
            <Button variant='contained' color='secondary'> Click Aquí</Button>
          </Link>
        </Box>
      </Modal>
    </Box>
  );
};
export default ErrorModal;
