import React from "react";

const Filters = ({ filters, setFilters }) => {
  const handleChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="flex gap-6 mb-6">
      <select onChange={(e) => handleChange("style", e.target.value)}>
        <option value="">Style</option>
        <option>Sandals</option>
        <option>Trainers</option>
        <option>Boots</option>
        <option>Slippers</option>
        <option>Canvas</option>
        <option>Summer Shop</option>
      </select>

      <select onChange={(e) => handleChange("size", e.target.value)}>
        <option value="">Size</option>
        <option>UK(3)</option>
        <option>UK(4)</option>
        <option>UK(5)</option>
        <option>UK(6)</option>
      </select>

      <select onChange={(e) => handleChange("brand", e.target.value)}>
        <option value="">Brands</option>
        <option>Skechers</option>
        <option>Kickers</option>
        <option>Marvel</option>
        <option>Totes</option>
        <option>Comfy Steps</option>
        <option>Becket</option>
        <option>Lambretta</option>
      </select>

      <select onChange={(e) => handleChange("color", e.target.value)}>
        <option value="">Color</option>
        <option>Black</option>
        <option>White</option>
        <option>Blue</option>
        <option>Red</option>
        <option>Brown</option>
        <option>Green</option>
        <option>Yellow</option>
        <option>Orange</option>
        <option>Grey</option>
      </select>
    </div>
  );
};

export default Filters;
