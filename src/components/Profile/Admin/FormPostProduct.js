
import Button from "@mui/material/Button";
import TextField from "@mui/joy/TextField";

import { useEffect, useState } from "react";
import { postProd } from "../../../services/db";
import { useNavigate } from "react-router-dom";
import "./style/profileAdmin.scss";
import InfoModal from '../../Modals/InfoModal'

const FormPostProduct = () => {
 

  const [successProd, setSuccessProd] = useState(false);
  const navigate = useNavigate();

  /* Carga nuevo producto */
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: "",
    precio: parseInt(""),
    descripcion: "",
    foto: "",
    stock: parseInt(""),
    codigo: parseInt(""),
  });

  const agregarProducto = async (e) => {
    e.preventDefault();
    const {
      nombre,
      precio,
      categoria,
      descripcion,
      stock,
      foto,
      cantidad,
      codigo,
    } = nuevoProducto;


    const postProduct = await postProd(nuevoProducto);

    if (postProduct.status === 200) {
      setSuccessProd(true)
      
    } else {
      alert("error");
    }
  };

  

  const handleChange = (e) => {
    setNuevoProducto({
      ...nuevoProducto,
      [e.target.name]: e.target.value,
    });
  };

  
  return (
    <>
      {successProd? <InfoModal
      texto={'Producto cargado correctamente'}
      subtexto={'Haga click para volver'}
      /> :
      <div className="boxAgregarProducto">
        <form className="formAdmin" onSubmit={agregarProducto}>
          <label>Ingrese el nombre del producto</label>
          <input
            type="text"
            placeholder="nombre"
            name="nombre"
            required
            onChange={handleChange}
          />
          <label>Ingrese el precio</label>
          <input
            type="number"
            placeholder="precio"
            name="precio"
            required
            onChange={handleChange}
          />
          <label>Ingrese categoria del producto</label>

          <select name="categoria" required onChange={handleChange}>
            <option>Eliga la categoria de la bebida</option>
            <option>cervezas</option>
            <option>aperitivo</option>
            <option>vinos</option>
            <option>gaseosas</option>
            <option>comun</option>
          </select>

          <label>Ingrese la descripción del producto</label>
          <input
            type="text"
            placeholder="descripcion"
            name="descripcion"
            required
            onChange={handleChange}
          />

          <label>Ingrese la cantidad de stock</label>
          <input
            type="number"
            placeholder="stock"
            name="stock"
            required
            onChange={handleChange}
          />
          <label>Ingrese el codigo del producto</label>
          <input
            type="number"
            placeholder="codigo"
            name="codigo"
            required
            onChange={handleChange}
          />

          <label>Ingrese la url de la imagen del producto</label>

          <input
            aria-label="foto"
            name="foto"
            type="text"
            placeholder="Agrega imagen"
            onChange={handleChange}
            required
          />

          <Button
            type="submit"
            variant="contained"
            className="btnAgregarProducto"
          >
            Agregar producto
          </Button>
        </form>
      </div>
    }
    </>
    
  );
};

export default FormPostProduct;
