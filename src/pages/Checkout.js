import { Button, Container, Grid } from "@mui/material";
import * as React from "react";
import Box from "@mui/material/Box";
import { deleteCart, sendOrder } from "../services/db";
import TextField from "@mui/material/TextField";
import CartContext from "../context/CartContext";
import "./styles/checkout.scss";
import CircularIndeterminate from "../components/CircularProgress/Circular";
import Modal from "@mui/material/Modal";
import { Link } from "react-router-dom";

import InfoModal from "../components/Modals/InfoModal";
import OrderModal from "../components/Modals/OrderModal";
import { useState, useContext } from "react";
import { authData } from "../services/authJWT";

const Checkout = () => {
  const { cartProducts, setCartProducts, total, delProd } = useContext(CartContext);

  const user = authData()
  const [newAdress, setNewAdress] = useState(false);
  const [loading, setLoading] = useState(false);
  const [datos, setDatos] = useState({
    email: user.email,
    direccion: user.direccion,
    ciudad: user.ciudad,
    telefono: user.telefono,
  });

  const [openModal, setOpenModal] = useState(false);
  const [orderGenerada, setOrderGenerada] = useState(false);
  const [error, setError] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);
  const addNewAdress = () => {
    setNewAdress(true);
  };

  const handelChange = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const saveNewAdress = (e) => {

    setNewAdress(false);
  };
  const deletCart = async () => {
    const email = user.email;
    const response = await deleteCart(email);

  };

  const handelClose = () => setOpenModal(false);
  const handelOrder = async () => {
    deletCart();

    const prods = cartProducts.map((i) => {
      return {
        nombre: i.nombre,
        cantidad: i.cantidad,
        precio: i.precio,
      };
    });
    const order = {
      email: user.email,
      productos: prods,
      direccion: user.direccion,
      ciudad: user.ciudad,
      total: total(),
    };

    const response = await sendOrder(order);

    if ( response.status === 200) {
      setCartProducts([]);
      localStorage.removeItem('productos')
      setOpenModal(true);
      setOrderGenerada(response.data);
    } else {
      setError(true);
    }
  };
  const totalCarro = orderGenerada.total;
 
  return (
    <>
      {!user ? (
        <Container>
          <h1>
            Debe loguearse para ingresar a esta ruta, por favor ingrese aquí{" "}
          </h1>
          <Link to={"/login"}>
            {" "}
            <Button color={"primary"} variant={"outlined"}>
              Login
            </Button>
          </Link>
        </Container>
      ) : (
        <>
          <Container>
            <h1>Checkout</h1>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <h3>Datos de envío</h3>
                <hr />
                <p>Direccion: {datos.direccion}</p>
                <p>Ciudad: {datos.ciudad}</p>
                <p>Telefono: {datos.telefono}</p>

                <Button onClick={addNewAdress} variant="outlined" color="info">
                  Cambiar dirección de envío
                </Button>
                {newAdress ? (
                  <>
                    <Box
                      component="form"
                      sx={{
                        "& .MuiTextField-root": { m: 1, width: "25ch" },
                      }}
                      noValidate
                      autoComplete="off"
                    >
                      <div>
                        <TextField
                          required
                          id="outlined-required"
                          label="Ingrese dirección"
                          defaultValue=""
                          name="direccion"
                          onChange={handelChange}
                        />
                        <TextField
                          required
                          id="outlined-required"
                          label="Ciudad"
                          defaultValue=""
                          name="ciudad"
                          onChange={handelChange}
                        />

                        <TextField
                          id="outlined-number"
                          label="Number"
                          type="number"
                          name="telefono"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          onChange={handelChange}
                        />

                        <Button onClick={saveNewAdress}>
                          Guardar nueva dirección
                        </Button>
                      </div>
                    </Box>
                  </>
                ) : (
                  ""
                )}
              </Grid>
              <Grid item xs={12} sm={8}>
                <h3>Productos</h3>
                <hr />

                <div className="boxItems">
                  {cartProducts.map((i, index) => {
                    return (
                      <div key={index} className="boxItemCheckout">
                        <img src={i.foto} />
                        <p>{i.nombre}</p>
                        <p>Cantidad: {i.cantidad}</p>
                        <p>Precio: ${i.precio}</p>
                      </div>
                    );
                  })}
                </div>
                <hr />
                <h4>Total: ${total()}</h4>
                <Button className="btnFinCompra" variant='outlined' onClick={handelOrder}>
                  FINALIZAR COMPRA
                </Button>
              </Grid>
            </Grid>
          </Container>
          <Container>
            
            <Modal
              sx={{
                height: 800,
                flexGrow: 1,
                minWidth: 300,
                transform: "translateZ(0)",
                "@media all and (-ms-high-contrast: none)": {
                  display: "none",
                },
              }}
              onClose={() => handelClose}
              open={openModal}
            >
              <Box>

                {orderGenerada == false ? 
                  <CircularIndeterminate />
                 : error ? (
                  <>
                    <InfoModal
                      texto={
                        "Hubo un error en el intento de realizar la compra"
                      }
                      subtexto={`Por favor intente nuevamente`}
                      colorBtn={"info"}
                    />
                  </>
                ) : (
                  <>

                    <OrderModal
                      texto={
                        "Muchas gracias por su compra! Su orden se ha generado exitosamente."
                      }
                      subtexto={`Su numero de identificación es Orden Numero: ${orderGenerada.numero}`}
                      colorBtn={"info"}
                      order={orderGenerada.numero}
                      total={totalCarro}
                    />
                  </>
                )}
              </Box>
            </Modal>
          </Container>
        </>
      )}
    </>
  );
};

export default Checkout;
