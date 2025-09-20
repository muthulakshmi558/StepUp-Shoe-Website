import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '../components/Navbar';
import MenuLinks from '../components/MenuLinks';
import HeroSection from '../components/HeroSection';
import OverviewSection from '../components/OverviewSection';
import ProductsGrid from '../components/ProductCard';
import Footer from '../components/Footer';

function HomePage() {
  return (
    <>
        <Navbar />
          <h1 className="text-4xl font-bold text-center mb-4">StepUp.in</h1>
          <hr className="w-1/4 mx-auto border-t-2 border-gray-300 mb-6" />
          <MenuLinks />
          <HeroSection />
          <OverviewSection />
          <ProductsGrid/>
          <Footer />
        </>
  );
}

export default HomePage;