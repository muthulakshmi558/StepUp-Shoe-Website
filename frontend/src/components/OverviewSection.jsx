import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { Link } from 'react-router-dom';

const OverviewSection = () => {
  const [section, setSection] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSection = async () => {
      try {
        const response = await api.get('products/overview-sections/');
        setSection(response.data.results ? response.data.results[0] : response.data[0] || {});
        setLoading(false);
        console.log('Overview Section Data:', response.data); // Debug the data
      } catch (err) {
        console.error('Error fetching overview section:', err);
        setError('Failed to load section. Please try again later.');
        setLoading(false);
      }
    };
    fetchSection();
  }, []);

  if (loading) return <p className="text-center py-4">Loading section...</p>;
  if (error) return <p className="text-center py-4 text-red-500">{error}</p>;

  const images = [
    { src: section.image1, title: section.image1_title },
    { src: section.image2, title: section.image2_title },
    { src: section.image3, title: section.image3_title },
  ];

  return (
  <div className="mx-auto py-8 px-[5%]">
    {/* First Title and Overview Content */}
    <h2 className="text-4xl font-bold text-center mb-6">{section.first_title}</h2>
    <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
      {section.overview_content}
    </p>

    {/* Next Title and Images */}
    <h2 className="text-3xl font-bold text-center mb-6">{section.next_title}</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      {images.map((item, index) => (
        <div key={index} className="text-center">
          <img
            src={item.src || 'https://via.placeholder.com/300x200'}
            alt={item.title || `Featured ${index + 1}`}
            className="w-full h-64 object-cover rounded-lg shadow-md"
            onError={(e) => {
              console.log('Image load error for:', item.src);
              e.target.src =
                'https://via.placeholder.com/300x200?text=Image+Not+Found';
            }}
            onLoad={() => console.log('Image loaded:', item.src)}
          />
          <h4 className="mt-3 text-lg font-semibold">
            {item.title || `Featured ${index + 1}`}
          </h4>
        </div>
      ))}
    </div>

    {/* Bottom Title */}
    <h3 className="text-2xl font-semibold text-center mt-4">
      {section.bottom_title}
    </h3>
  </div>
);

};

export default OverviewSection;