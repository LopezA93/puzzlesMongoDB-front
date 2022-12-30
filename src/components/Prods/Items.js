import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";

import Card from "@mui/joy/Card";

import Typography from "@mui/joy/Typography";

import ItemCount from "../ItemCount/ItemCount";
import CartContext from "../../context/CartContext";

import { useContext,  } from "react";
import { useNavigate } from "react-router-dom";

export default function ProdCard({ prod }) {
  const { nombre, foto, precio, stock, cantidad } = prod;
  const { agregarProductoCarro } = useContext(CartContext);

  const navigate = useNavigate()
  const addtoCart = (number) => {
    agregarProductoCarro(prod, number);
    navigate('/modalCart')
  };


  return (
    <>
    <Card className="cardProd" variant="outlined" sx={{ width: 320 }}>
      <Typography level="h2" fontSize="md" sx={{ mb: 0.5 }}>
        {nombre}
      </Typography>

      <AspectRatio minHeight="120px" maxHeight="200px" sx={{ my: 2 }}>
        <img src={`${foto}`} loading="lazy" alt="Img prod" />
      </AspectRatio>
      <Box sx={{ display: "flex" }}>
        <div>
          <Typography level="body3">Precio:</Typography>
          <Typography fontSize="lg" fontWeight="lg">
            ${precio}
          </Typography>
          
        </div>
        <div>
        <Typography marginLeft={2} textColor='#0808088f' fontSize="sm" >
            Stock {stock}
          </Typography>
        </div>

        <ItemCount stock={stock} addItem={addtoCart} />
      </Box>
    </Card>
    </>
  );
}
