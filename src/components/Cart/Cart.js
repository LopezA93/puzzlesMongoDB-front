import { useContext, useState } from "react";
import { Container, Button, Modal } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link, useNavigate } from "react-router-dom";
import CartContext from "../../context/CartContext";
import "./style/cart.scss";


const CartPage = () => {
  const navigate = useNavigate();
  const { cartProducts, setCartProducts, total, delProd } =
    useContext(CartContext);
  const user = JSON.parse(localStorage.getItem("login"));

  
  
  // const [formData, setFormData] = useState(
  //     {

  //         name: "",
  //         phone: "",
  //         email: "",

  //     }
  // )
  // const [order, setOrder] = useState(
  //     {
  //         buyer: formData,
  //         items: cartProducts.map((product) => {
  //             return {
  //                 nombre: product.nombre,
  //                 precio: product.precio,
  //                 cantidad: product.cantidad,
  //                 id: product.id,
  //             }
  //         }),
  //         total: calcTotal()
  //     }

  // )

  // const [orderGenerada, setOrderGenerada] = useState()
  // const [loading, setLoading] = useState(true)
  // const totalCarro = calcTotal()

  // const enviarOrder = async () => {
  //     const docRef = await addDoc(collection(db, "ordenes"), { ...order, buyer: formData });

  //     setOrderGenerada(docRef.id)

  // }

  // const addOrder = () => {
  //     setOpenModal(true)
  // }

  // const infoComprador = (e) => {
  //     setFormData({
  //         ...formData,
  //         [e.target.name]: e.target.value
  //     })

  // }
  // const formSubmit = (e) => {
  //     e.preventDefault()

  //         setOrder({
  //             ...order,
  //             buyer: formData
  //         })

  //         enviarOrder()
  //         localStorage.removeItem("productos")
  //         setLoading(false)

  // }
  // const cerrarCarrito = () => {

  //     navigate("/")
  //     setCartProducts([])

  // }

  return (
    <>
      {" "}
      <Container>
        <h1>Carrito</h1>
        {cartProducts.length ? (
          <div className="box">
            {cartProducts.map((product, index) => {
              return (
                <Container className="itemBox" key={index}>
                  <img src={product.foto} />
                  <p>Producto: {product.nombre}</p>
                  <p>Precio: $ {product.precio}</p>
                  <p>Cantidad: {product.cantidad}</p>
                  <Button onClick={() => delProd(product)}>
                    <DeleteIcon className="btnDeleteItem" />
                  </Button>
                </Container>
              );
            })}

            <Container className="finBox">
              <h4>TOTAL: ${total()}</h4>
              <Button className="btnFinCompra" onClick={()=> navigate('/checkout')}>
                Continuar
              </Button>
            </Container>
          </div>
        ) : (
          <div className="cartVacio">
            <p>
              No hay productos en el carrito, para comprar agregue productos
            </p>
            <Link to={"/products"}>
              <Button className="btnVolver">Productos</Button>
            </Link>
          </div>
        )}
      </Container>
      {/* <Modal onClose={() => setOpenModal(false)} open={openModal}>

                {
                    loading ? (
                        <div className="formCompra">
                            <h2>Formulario de compra</h2>
                            <form onSubmit={formSubmit}>
                                <input type="text" name="name" required placeholder="Nombre completo" onChange={infoComprador}
                                    value={formData.name} />
                                <input type="number" name="phone" required placeholder="Telefono" onChange={infoComprador}
                                    value={formData.phone} />
                                <input type="mail" id="email" name="email" required placeholder="Correo electrónico" onChange={infoComprador} value={formData.email} />
                                <input type="mail"  id="email2" name="email2" required placeholder=" Confirme su correo electrónico" onChange={infoComprador} value={formData.emailDos} pattern={formData.email} />
                                
                                <Button type="submit" >Enviar</Button>
                            </form>

                        </div>

                    ) : (
                        !orderGenerada ? (
                            <Box className="loadingOrder" sx={{ display: 'flex' }}>
                                <CircularProgress />
                            </Box>
                        ) : (
                            <div className="formCompraRealizada">
                                <h3> Muchas gracias por su compra! Su orden se ha generado exitosamente</h3>
                                <p>Su numero de identificación es: <span className="orderId">{orderGenerada}</span></p>
                                <p>Para abonar su pedido con tarjeta de credito o debito haga click en pagar.</p>
                                <Button onClick={cerrarCarrito}>Cerrar</Button>
                                <form action="https://us-central1-puzzles-65bfd.cloudfunctions.net/app/checkout" method="POST">
                                    <input type="hidden" name="title" value={orderGenerada} />
                                    <input type="hidden" name="price" value={totalCarro} />
                                    <input type="submit" className="btnPagar" value="Pagar" />

                                </form>
                            </div>)


                    )
                }
            </Modal> */}
    </>
  );
};

export default CartPage;
