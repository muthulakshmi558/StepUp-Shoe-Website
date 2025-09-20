import React, { useEffect, useState } from "react";
import api from "../api/axios";

const About = () => {
  const [aboutData, setAboutData] = useState([]);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await api.get("products/about/");
        setAboutData(res.data);
      } catch (err) {
        console.error("Error fetching about data:", err);
      }
    };

    fetchAbout();
  }, []);

  return (
    <div className="relative bg-white py-20 px-6 lg:px-28 font-libre">
      {aboutData.map((item, index) => (
        <div
          key={index}
          className="flex flex-col lg:flex-row items-center justify-between gap-10"
        >
          {/* Left Content (80%) */}
          <div className="w-full lg:w-4/5 text-center lg:text-left">
            <h2 className="text-2xl font-bold mb-6 text-slategray text-center">
              {item.title}
            </h2>
            <p className="text-md leading-relaxed text-black">
              {item.description}
            </p>
          </div>

          {/* Right Image (20%) */}
          <div className="w-full lg:w-1/5 flex justify-center lg:justify-end relative">
            {/* Pale Red Half Circle */}
            <div className="absolute w-[500px] h-[500px] bg-palered rounded-full right-0 top-1/2 -translate-y-1/2 -z-0"></div>

            <img
              src={item.image}
              alt={item.title}
              className="relative z-10 w-[180px] object-contain"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default About;
