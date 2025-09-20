import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await api.get('products/hero-slides/');
        setSlides(response.data.results || response.data);
        setLoading(false);
        console.log('API Response:', response.data); // Debug the data
      } catch (err) {
        console.error('Error fetching slides:', err);
        setError('Failed to load slides. Please try again later.');
        setLoading(false);
      }
    };
    fetchSlides();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  if (loading) return <p className="text-center py-4">Loading slides...</p>;
  if (error) return <p className="text-center py-4 text-red-500">{error}</p>;

return (
  <div className="relative">
    <Slider {...settings} className="hero-slider">
      {slides.map((slide, index) => (
            <div key={index} className="relative aspect-[16/7] w-full">
            <img
                src={slide.image}
                alt={slide.title || 'Hero Slide'}
                className="w-full h-full object-cover"
                onError={(e) => {
                e.target.src = 'https://via.placeholder.com/1200x400';
                }}
            />
            <div
                className={`absolute top-1/2 transform -translate-y-1/2 ${
                slide.position === 'right' ? 'right-10 text-right' : 'left-10 text-left'
                } w-1/3 bg-black bg-opacity-50 p-4 rounded-lg text-white`}
            >
                <h2 className="text-xl font-bold mb-2">
                {slide.description || 'No description'}
                </h2>
                <Link
                to={slide.button_link || '#'}
                className="inline-block bg-white text-black px-4 py-2 rounded hover:bg-gray-200"
                >
                {slide.button_text || 'Shop Now'}
                </Link>
            </div>
            </div>

      ))}
    </Slider>
  </div>
);



};

export default HeroSection;