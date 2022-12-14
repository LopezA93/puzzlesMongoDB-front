import "./App.css";
import Navbar from "./components/Navbar/navbar";
import ItemListContainer from "./components/Prods/ItemListContainer";
import FormLogin from "./components/Forms/FormLogin";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FormSignup from "./components/Forms/FormSignup";
import NavCategory from "./components/Prods/ItemsCategory";
import { CartProvider } from "./context/CartContext";
import CartModal from "./components/Modals/CartModal";
import CartPage from "./components/Cart/Cart";
import Home from "./pages/Home";
import Error404 from "./pages/Error404";
import Profile from "./pages/Profile";
import Checkout from "./pages/Checkout";
import { RequireAuth } from "./services/AuthProtected";
import ChatPage from "./pages/Chat";
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
            <Route
              path="/profile"
              element={
                <RequireAuth>
                  {" "}
                  <Profile />
                </RequireAuth>
              }
            />
            <Route path="/products/:category" element={<NavCategory />} />
            <Route path="/chat" element={<ChatPage />} />

            <Route path="*" element={<Error404 />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/modalCart" element={<CartModal />} />
            <Route
              path="/checkout"
              element={
                <RequireAuth>
                  {" "}
                  <Checkout />
                </RequireAuth>
              }
            />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </>
  );
}

export default App;
