import { Button } from "@mui/material";
import { useState } from "react";

const ItemCount = ({ stock, addItem }) => {
  const [number, setNumber] = useState(1);
  let min = 0;
  const add = () => {
    setNumber(number + 1);
  };
  const rem = () => {
    setNumber(number - 1);
  };

  return (
    <>
      <Button color="secondary" onClick={add} disabled={number === stock ? true : false}>
        {" "}
        +{" "}
      </Button>{" "}
      {number}{" "}
      <Button color="secondary" onClick={rem} disabled={number === min ? true : false}>
        -
      </Button>
      <Button
        variant="solid"
        size="sm"
        color="primary"
        aria-label="Explore Bahamas Islands"
        sx={{ ml: "auto", fontWeight: 600 }}
        onClick={() => addItem(number)}
        disabled = {number === min ? true : false}
      >
        Añadir
      </Button>
    </>
  );
};
export default ItemCount;
