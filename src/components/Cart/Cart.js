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
              <Button className="btnFinCompra" variant="contained" onClick={()=> navigate('/checkout')}>
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
              <Button  variant='contained' color='warning' className="btnVolver">Productos</Button>
            </Link>
          </div>
        )}
      </Container>
      
    </>
  );
};

export default CartPage;
