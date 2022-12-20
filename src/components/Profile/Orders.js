import { getOrdersByEmail } from "../../services/db";
import { useQuery } from "react-query";
import CircularIndeterminate from "../CircularProgress/Circular";
import { Stack } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";

const Orders = () => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const data = async () => {
    const user = JSON.parse(localStorage.getItem("login"));
    const email = user.email;
    try {
      const res = await getOrdersByEmail(email);
      return res.data;
    } catch (error) {
      return error;
    }
  };
  const { data: orders, error, isLoading } = useQuery(["orders"], data, {cacheTime:1000});
  if (isLoading) return <CircularIndeterminate />;

  if (error)
    return (
      "Ha ocurrido un error, por favor vuelva a ingresar. " + error.message
    );

  return (
    <>
      {orders.length === undefined
        ? orders.message
        : orders.map((order, index) => {
            return (
              <Stack spacing={2} key={index}>


                <Accordion
                  expanded={expanded === "panel1"}
                  onChange={handleChange("panel1")}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >
                    <Typography sx={{ width: "33%", flexShrink: 0 }}>
                      Orden: {order.numero}
                    </Typography>
                    <Typography sx={{ color: "text.secondary" }}>
                      Fecha: {order.fecha.substring(3,15)}
                    </Typography>
                    <Typography sx={{ color: "text.secondary", marginLeft:'5rem' }}>
                      Total: ${order.total}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {order.productos.map((prod, index) => (
                      <Typography
                        key={index}
                        display={"flex"}
                        justifyContent={"space-around"}
                      >
                        <span>Item: {prod.nombre}</span> -{" "}
                        <span>Cantidad:{prod.cantidad}</span> -{" "}
                        <span>
                          Precio:
                          {prod.precio}
                        </span>
                      </Typography>
                    ))}
                    
                  </AccordionDetails>
                </Accordion>
                {/* <p>Orden Num. {order.numero}</p>
                <p>Fecha: {order.estado}</p>
                <div>
                  Productos:
                  {order.productos.map((prod) => (
                    <div key={prod.productId}>
                      <p>Nombre: {prod.nombre}   Cantidad:{prod.cantidad}   Precio:
                      {prod.precio}</p>
                    </div>
                  ))}
                </div> */}
              </Stack>
            );
          })}
    </>
  );
};

export default Orders;
