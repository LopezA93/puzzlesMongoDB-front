import { getProducts, deletProd, putProd } from "../../../services/db";
import { useQuery } from "react-query";
import CircularIndeterminate from "../../CircularProgress/Circular";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import InfoModal from "../../Modals/InfoModal";
const ProdsList = () => {
  const navigate = useNavigate();
  const [edit, setEdit] = useState(false)
  const {
    data: prodsAdmin,
    error,
    isLoading,
  } = useQuery(["prodsAdmin"], getProducts);

  const [newValue, setNewValue] = useState({
    precio: parseInt(""),
    stock: parseInt(""),
  });
  const onChangeValues = (e) => {
    e.preventDefault();
    setNewValue({
      ...newValue,
      [e.target.name]: e.target.value,
    });
    // console.log(newValue)
  };

  const editItem = async (id) => {
    try {
      const productEdit = await putProd(id, newValue);
      console.log(productEdit);
      if (productEdit.status === 200) {
        setEdit(true)
        
      } else {
        alert("error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteItem = async (id) => {
    try {
      const { data } = await deletProd(id);
      console.log(data);
      // alert("producto eliminado correctamente", data);
      navigate("/admin");
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) return <CircularIndeterminate />;

  if (error) return "Ha ocurrido un error: " + error.message;

  return (
    <>
    {
      edit? <InfoModal
      texto={'Producto cargado correctamente'}
      subtexto={'Haga click para volver'}
      />  :
     <>
      <h1>Listado de productos</h1>
      <div className="Items">
        {prodsAdmin.map((producto, index) => {
          return (
            <div key={index} className="boxEditarItem">
              <img src={producto.foto} />
              <p className="nombreItem"> {producto.nombre} </p>

              <label>Ingrese nuevo precio</label>
              <input
                placeholder="Precio"
                type="number"
                required
                id="precio"
                name="precio"
                onChange={onChangeValues}
              />
              <label>Ingrese cantidad stock</label>
              <input
                placeholder="Stock"
                type="number"
                required
                id="stock"
                name="stock"
                onChange={onChangeValues}
              />

              <div className="btns">
                <Button
                  variant="contained"
                  className="btnEliminarItem"
                  onClick={() => deleteItem(producto._id)}
                >
                  Eliminar
                </Button>

                <Button
                  variant="contained"
                  className="btnEditarItem"
                  onClick={() => editItem(producto._id)}
                >
                  Editar
                </Button>
              </div>
            </div>
          );
        })}
      </div>
      </>}
    </>
  );
};
export default ProdsList;
