import axios from "axios";
import authHeader from "./authJWT";

const url = "http://localhost:8081";
// products

const getProducts = async () => {
  try {
    const { data } = await axios.get(`${url}/products`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

//users

const getUser = async (user) => {
  const response = await axios.post(`${url}/users/login`, user);

    return response;
  // try {
    
  // } catch (error) {
  //   const err = error.response.data.message
  //   console.log(err)
  //   return err
  // }
};

const getProfile = async () => {
  const response = await axios.get(`${url}/users/profile`, {headers: authHeader()})
  return response
}

const logout = async () => {
  try {
    const response = await axios.get(`${url}/users/logout`);
    return response
  } catch (error) {
    console.log(error)
  }
}

// const getToken = async (user) => {
//   try {
//     const data = await axios.post(`${url}/users/login`, user.token);
//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// };

//CHAT
const getMessages = async () => {
  try {
    const { data } = await axios.get(`${url}/chat`);
    return data;
  } catch (error) {
    console.log(error);
  }
};
const postMessage = async (mensaje) => {
  try {
    const { data } = await axios.post(`${url}/chat`, mensaje);
    return data;
  } catch (error) {
    console.log(error);
  }
};

//orders
const getOrdersByEmail = async (email) => {
  const response = await axios.get(`${url}/orden/${email}`)
  return response
}


export default getProducts;

export { getUser, getMessages, 
  // getToken, 
  postMessage, logout, getProfile, getOrdersByEmail};
