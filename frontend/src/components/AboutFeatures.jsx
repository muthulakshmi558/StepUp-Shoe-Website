import React, { useEffect, useState } from "react";
import api from "../api/axios"; // adjust path if needed

const AboutFeatures = () => {
  const [mainImage, setMainImage] = useState(null);
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const imgRes = await api.get("products/about-main/");
        if (imgRes.data.length > 0) setMainImage(imgRes.data[0]);

        const featRes = await api.get("products/about-features/");
        setFeatures(featRes.data);
      } catch (err) {
        console.error("Error fetching about data:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white py-16 px-6 lg:px-20 font-['Libre_Baskerville'] text-md text-black">
      {/* Row 1 - Circle Image */}
      {mainImage && (
        <div className="flex justify-center mb-16">
          <div className="w-72 h-72 lg:w-96 lg:h-96 rounded-full overflow-hidden shadow-lg flex items-center justify-center">
            <img
              src={mainImage.image}
              alt="About Main"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}

      {/* Row 2 - 3 Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center max-w-6xl mx-auto">
        {features.map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            <h3 className="text-xl font-bold text-[#2F4F4F] mb-4">
              {item.title}
            </h3>
            <p className="text-gray-700 leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutFeatures;
