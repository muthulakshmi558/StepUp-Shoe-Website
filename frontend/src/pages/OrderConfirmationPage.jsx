import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '../components/Navbar';
import MenuLinks from '../components/MenuLinks';

import Footer from '../components/Footer';
import OrderConfirmation from '../components/OrderConfirmation';


function OrderConfirmationPage() {
  return (
    <>
        <Navbar />
          <h1 className="text-4xl font-bold text-center mb-4">StepUp.in</h1>
          <hr className="w-1/4 mx-auto border-t-2 border-gray-300 mb-6" />
          <MenuLinks />
          <OrderConfirmation />
          <Footer />
        </>
  );
}

export default OrderConfirmationPage;