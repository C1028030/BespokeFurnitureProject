import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import CreateOrder from "./pages/CreateOrder";
import TrackOrder from "./pages/TrackOrder";
import Orders from "./pages/Orders";
import OrderDetail from "./pages/OrderDetail";
import EditOrder from "./pages/EditOrder";
import Dashboard from "./pages/Dashboard";
import Manufacturing from "./pages/Manufacturing";
import DeliveryPlanning from "./pages/DeliveryPlanning";
import CustomerHistory from "./pages/CustomerHistory";

import "./App.css";

function App() {
  // Stores logged-in user so React re-renders when login changes
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  return (
    <BrowserRouter>
      <Navbar user={user} setUser={setUser} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
        <Route path="/register" element={<Register />} />
        {/* Pass setUser so Login can update navbar immediately */}
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/create" element={<CreateOrder />} />
        <Route path="/track-order" element={<TrackOrder />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/orders/:orderId" element={<OrderDetail />} />
        <Route path="/orders/:orderId/edit" element={<EditOrder />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/manufacturing" element={<Manufacturing />} />
        <Route path="/delivery" element={<DeliveryPlanning />} />
        <Route path="/customer-history" element={<CustomerHistory />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;