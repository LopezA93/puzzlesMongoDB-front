import { useFormik } from "formik";
import * as yup from "yup";
import { Link, redirect } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/joy/TextField";
import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import { postProd } from "../../../services/db";
import { useNavigate } from "react-router-dom";
import './style/profileAdmin.scss'

const FormPostProduct = () => {
//   const { getProducts } = useContext(ItemContext);
//   const [productos, setProductos] = useState([]);\
    const [user, setUser] = useState()
  const [logueado, setLogueado] = useState(false);
  const navigate = useNavigate();

  /* Carga nuevo producto */
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: "",
    precio: parseInt(""),
    descripcion: "",
    foto: "",
    stock: parseInt(""),
    codigo:parseInt(""),

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
      codigo
    } = nuevoProducto;
    

    console.log("Nuevo producto agregado: ", nuevoProducto );
    const postProduct = await postProd(nuevoProducto)
    console.log(postProduct)
    
  };
 

//   const [nuevosValores, setNuevosValores] = useState({
//     precio: "",
//     stock: "",
//   });

//   const onChangeValores = (e) => {
//     e.preventDefault();

//     setNuevosValores({
//       ...nuevosValores,
//       [e.target.name]: e.target.value,
//     });
//     console.log(nuevosValores);
//   };

//   const editarProducto = async (id) => {
//     const productosList = doc(db, "bebidas", `${id}`);

//     await updateDoc(productosList, {
//       precio: parseInt(nuevosValores.precio),
//       stock: parseInt(nuevosValores.stock),
//     });

//     console.log("Producto editado correctamente");
//   };

//   const eliminarProducto = async (id) => {
//     const productosList = doc(db, "bebidas", `${id}`);
//     await deleteDoc(productosList);
//     console.log("Producto eliminado");
//     navigate("/panel-admin");
//   };

  const handleChange = (e) => {
    setNuevoProducto({
      ...nuevoProducto,
      [e.target.name]: e.target.value,
    });
  };

//   const fileHandle = async (e) => {
//     const file = e.target.files[0];
//     const archivoRef = ref(storage, `productos/${file.name}`);
//     await uploadBytes(archivoRef, file);
//     urlDescarga = await getDownloadURL(archivoRef);
//   };

//   useEffect(() => {
//     const loggedUserJSON = localStorage.getItem("login");
//     console.log(loggedUserJSON)
//         if (loggedUserJSON.role == "admin") {
//           const user = JSON.parse(loggedUserJSON);
//           setUser(user);
//           return;
//         } else {
//           navigate("/");
//         }
//   }, []);
  return (
    
        <>
          
          <div className="boxAgregarProducto">
            <form className='formAdmin'onSubmit={agregarProducto}>
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
                <option>aperitivos</option>
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
                  name='foto'
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
        </>
     
    

  );
};

export default FormPostProduct;
