import axios from "axios";
import authHeader from "./authJWT";

const url = "https://puzzles-bar.vercel.app";
// const url = 'http://localhost:8081'

// products

const getProducts = async () => {
  try {
    const { data } = await axios.get(`${url}/products`);
    return data;
  } catch (error) {
    console.log(error);
  }
};
const getProductsByCategory = async (category) => {
  const response = await axios.get(`${url}/products/${category}`);
  return response;
};

const postProd = async (prod) => {
  const response = await axios.post(`${url}/products`, prod, {
    headers: authHeader(),
  });
  return response;
};

const deletProd = async (id) => {
  const response = await axios.delete(`${url}/products/${id}`, {
    headers: authHeader(),
  });
  return response;
};

const putProd = async (id, prod) => {
  const response = await axios.put(`${url}/products/${id}`, prod, {
    headers: authHeader(),
  });
  return response;
};

//users

const signUp = async (user) => {
  const response = await axios.post(`${url}/users/signup`, user);
  return response;
};

const getUser = async (user) => {
  const response = await axios.post(`${url}/users/login`, user);

  return response;
};

const getProfile = async () => {
  const response = await axios.get(`${url}/users/profile`, {
    headers: authHeader(),
  });
  return response;
};

const logout = async () => {
  try {
    const response = await axios.get(`${url}/users/logout`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

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
//cart

const saveCart = async (values) => {
  const response = await axios.post(`${url}/cart`, values);
  return response;
};
const deleteCart = async (email) => {
  const response = await axios.delete(`${url}/cart/${email}`);
  return response;
};


//orders
const getOrdersByEmail = async (email) => {
  const response = await axios.get(`${url}/order/${email}`);
  return response;
};

const sendOrder = async (values) => {
  const response = await axios.post(`${url}/order`, values)
  return response
}

//mp

const pointMP= async (values) => {
  const response = await axios.post(`${url}/mercadopago`, values)
  return response
}

export {
  getProducts,
  getUser,
  getMessages,
  postProd,
  deletProd,
  postMessage,
  logout,
  getProfile,
  getOrdersByEmail,
  getProductsByCategory,
  putProd,
  signUp,
  saveCart,
  deleteCart,
  sendOrder,
  pointMP
};
