import ProdCard from "./Items";
import getProducts from "../../services/db";
import { useQuery } from "react-query";
import CircularIndeterminate from "../CircularProgress/Circular";

const ItemListContainer = () => {
  const {
    data: prods,
    error,
    isLoading,
    isFetching,
  } = useQuery(["prods"], getProducts);

  if (isLoading) return <CircularIndeterminate/>;

  if (error) return "Ha ocurrido un error: " + error.message;

  return <>
  {
    prods.map((item) => {
        return <ProdCard prod={item}/>
    })
  }
  </>;
};

export default ItemListContainer;
