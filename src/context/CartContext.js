import { createContext, useState } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartProducts, setCartProducts] = useState(
    JSON.parse(localStorage.getItem("productos")) || []
  );
  

  const agregarProductoCarro = (product, cantidad) => {
    let existente = cartProducts.find(
      (cartProducts) => cartProducts._id === product._id
    );

    if (!existente) {
      product.cantidad = product.cantidad + cantidad;
      setCartProducts((cartProducts) => [...cartProducts, product]);
      localStorage.setItem(
        "productos",
        JSON.stringify([...cartProducts, product])
      );
    } else {
      existente.cantidad = existente.cantidad + cantidad;
    }
  };
  const delProd = (product) => {
    setCartProducts(
      cartProducts.filter((cartProduct) => {
        product.cantidad = 0;
        localStorage.removeItem("productos")
        return cartProduct._id !== product._id;
      })
    );
    
     
    
  };
  const total = () => {
    let total = 0;
    cartProducts.map((cartProduct) => {
      total = cartProduct.precio * cartProduct.cantidad + total;
    });
    return total;
  };

  const data = {
    agregarProductoCarro,
    cartProducts,
    setCartProducts,
    delProd,
    total,
  };
  return <CartContext.Provider value={data}>{children}</CartContext.Provider>;
};

export { CartProvider };
export default CartContext;
