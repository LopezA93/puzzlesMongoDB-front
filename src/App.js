import "./App.css";
import Navbar from "./components/Navbar/navbar";
import ItemListContainer from "./components/Prods/ItemListContainer";
import FormLogin from "./components/Forms/FormLogin";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import FormSignup from "./components/Forms/FormSignup";
import MensajesContainer from "./components/Messages/MensajesContainer";
import ProfileUser from "./components/Profile/Profile";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route index element={<FormLogin />} />
          <Route path="/login" element={<FormLogin />} />
          <Route path="/signup" element={<FormSignup />} />
          <Route path="/products" element={<ItemListContainer />} />
          <Route path="/chat" element={<MensajesContainer />} />
          <Route path="/profile" element={<ProfileUser />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
