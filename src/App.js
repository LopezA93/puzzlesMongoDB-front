import "./App.css";
import Navbar from "./components/Navbar/navbar";
import ItemListContainer from "./components/Prods/ItemListContainer";
import FormLogin from "./components/Forms/FormLogin";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import FormSignup from "./components/Forms/FormSignup";
import MensajesContainer from "./components/Messages/MensajesContainer";
import ProfileUser from "./components/Profile/Profile";
import NavCategory from "./components/Prods/ItemsCategory";
import ProfileAdmin from "./components/Profile/Admin/ProfileAdmin";
import { CartProvider } from "./context/CartContext";
import CartModal from "./components/Modals/CartModal"; 
import CartPage from "./components/Cart/Cart";
import Home from "./pages/Home";
import Error404 from './pages/Error404'
import Profile from "./pages/Profile";
function App() {
  
  return (
    <>
      <CartProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route index element={<Home />} />
            <Route path="/login" element={<FormLogin />} />
            <Route path="/signup" element={<FormSignup />} />
            <Route path="/products" element={<ItemListContainer />} />
            {/* <Route path="/chat" element={<MensajesContainer />} /> */}
            <Route path="/profile" element={<Profile/>} />
            <Route path="/products/:category" element={<NavCategory />} />
            {/* <Route path="/admin" element={<ProfileAdmin />} /> */}
            <Route path="*" element={<Error404/>} />
            <Route path="/cart" element={<CartPage/>} />
            <Route path="/modalCart" element={<CartModal/>}/>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </>
  );
}

export default App;
