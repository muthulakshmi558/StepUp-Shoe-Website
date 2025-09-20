import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './pages/Home';
import AboutPage from './pages/About';
import ContactPage from './pages/Contact';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import WomenProductsPage from "./pages/WomenProductsPage";
import MenProductsPage from "./pages/MenProductsPage";
import KidsProductsPage from "./pages/KidsProductsPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import TrackorderPage from "./pages/TrackorderPage";

function App() {
  return (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        {/* Auth Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/women" element={<WomenProductsPage />} />
        <Route path="/men" element={<MenProductsPage />} />
        <Route path="/kids" element={<KidsProductsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
        <Route path="/orders" element={<TrackorderPage />} />


        {/* <Route path="/cart" element={<CartPage />} /> */}
        {/* <Route path="/product/:id" element={<ProductPage />} /> */}
      </Routes>
  );
}

export default App;
