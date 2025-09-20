import React, { useState } from "react";
import { Link } from "react-router-dom";

const MenuLinks = () => {
  const [dropdown, setDropdown] = useState(null);

  const menuItems = [
    {
      title: "Women",
      megaMenu: true,
      items: [
        {
          heading: "New Arrivals",
          subItems: ["Sandals", "Trainers", "Canvas Shoes"],
        },
        {
          heading: "Safety Footwear",
          subItems: ["Steel Toe Boots", "Work Shoes", "Protective Slippers"],
        },
        {
          heading: "Boots",
          subItems: ["Ankle Boots", "Knee High", "Chelsea Boots"],
        },
        {
          heading: "Slippers",
          subItems: ["Casual Slippers", "Flip Flops", "Comfort Slides"],
        },
        {
          heading: "Heels",
          subItems: ["Pumps", "Block Heels", "Stilettos"],
        },
        {
          heading: "Flats",
          subItems: ["Ballerinas", "Loafers", "Mules"],
        },
        {
          heading: "Sneakers",
          subItems: ["Running Shoes", "Casual Sneakers", "High Tops"],
        },
        {
          heading: "Sports",
          subItems: ["Training", "Gym Shoes", "Walking Shoes"],
        },
      ],
    },
    { title: "Men", items: ["Casual", "Formal", "Sports", "Sneakers"] },
    { title: "Kids", items: ["Boys", "Girls", "Infants"] },
    { title: "Brands", items: ["Nike", "Adidas", "Puma", "Reebok"] },
    { title: "Offers", items: ["30% Off", "Buy 1 Get 1", "Clearance"] },
  ];

  return (
    <div className="relative">
      <div className="flex justify-center space-x-6 mb-6">
        {menuItems.map((item, index) => (
          <div key={index} className="relative group">
            {/* Main link navigates to /women, /men, etc. */}
            <Link
              to={`/${item.title.toLowerCase()}`}
              className="hover:underline focus:outline-none"
              onClick={() => setDropdown(dropdown === index ? null : index)}
            >
              {item.title}
            </Link>

            {/* Mega Menu for Women */}
            {dropdown === index && item.megaMenu && (
              <div className="absolute top-full left-0 -ml-20 w-[900px] bg-white shadow-lg rounded-md p-6 grid grid-cols-8 gap-4 z-20">
                {item.items.map((col, colIndex) => (
                  <div key={colIndex}>
                    <h4 className="font-semibold mb-2">{col.heading}</h4>
                    <ul className="space-y-1">
                      {col.subItems.map((subItem, subIndex) => (
                        <li key={subIndex}>
                          <Link
                            to={`/${item.title.toLowerCase()}/${col.heading
                              .toLowerCase()
                              .replace(/\s+/g, "-")}/${subItem
                              .toLowerCase()
                              .replace(/\s+/g, "-")}`}
                            className="hover:text-gray-600 text-sm"
                          >
                            {subItem}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {/* Normal dropdown for other menus */}
            {dropdown === index && !item.megaMenu && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white shadow-lg rounded-md p-2 grid grid-cols-1 gap-2 z-10">
                {item.items.map((subItem, subIndex) => (
                  <Link
                    key={subIndex}
                    to={`/${item.title.toLowerCase()}/${subItem.toLowerCase()}`}
                    className="hover:bg-gray-100 p-1 rounded"
                  >
                    {subItem}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuLinks;
