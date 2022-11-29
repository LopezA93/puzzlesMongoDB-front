import { getOrdersByEmail } from "../../services/db";
import { useQuery } from "react-query";

const Orders = () => {
  const data = async () => {
    const user = JSON.parse(localStorage.getItem("login"));
    const email = user.email;
    const res = await getOrdersByEmail(email);
    console.log(res.data);
    return res.data;
  };
  const { data: orders, error, isLoading } = useQuery(["orders"], data);
  if (isLoading) return "Loading...";

  if (error) return  "Ha ocurrido un error, por favor vuelva a ingresar. " + error.message;

  return <>
      {console.log("orders", orders)}
      {orders.length === 0 ? "No registra compras" 
        :
        orders
        .map((order ,index) => {
            return (
              <div key={index}>
                <p>Orden Num. {order.numero}</p>
                <p>Productos: {order.productos.map(prod=> <span key={prod.productId}>
                    {prod.nombre} Cantidad:{prod.cantidad} Precio: {prod.precio}
                </span>)}</p>
                <p>estado: {order.estado}</p>
              </div>
            );
          })
        }
    </>
  
};

export default Orders;
