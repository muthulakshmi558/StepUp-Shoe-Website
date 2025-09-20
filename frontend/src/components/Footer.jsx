import React, { useState } from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import api from "../api/axios";
import Confetti from "react-confetti";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [popup, setPopup] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/subscribe/", { email });
      setPopup(res.data.message);
      setShowConfetti(true);
      setEmail("");
      setTimeout(() => {
        setPopup("");
        setShowConfetti(false);
      }, 4000);
    } catch (err) {
      setPopup("You are already subscribed!");
      setTimeout(() => setPopup(""), 4000);
    }
  };

  return (
    <footer className="bg-[#2F4F4F] text-white px-[5%] py-12 font-['Libre_Baskerville'] relative">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        
        {/* Contact Us */}
        <div>
          <h3 className="font-bold text-sm mb-4">Contact Us</h3>
          <p className=" text-sm">We'd love to hear from you!</p>
          <p className=" text-sm  ">Landline : 044431234</p>
          <p className=" text-sm  ">WhatsApp : +91 9876543423</p>
          <p className=" text-sm  ">Email : steppup@gmail.com</p>
          <p className=" text-sm  ">Address : 2/38, surandai, Tenkasi, Tamilnadu, India</p>
        </div>

        {/* Shop */}
        <div>
          <h3 className="font-bold text-lg mb-4">Shop</h3>
          <ul className="space-y-2">
            <li>New in</li>
            <li>Women</li>
            <li>Men</li>
            <li>Accessories</li>
            <li>Heels</li>
            <li>About us</li>
          </ul>
        </div>

        {/* Info */}
        <div>
          <h3 className="font-bold text-lg mb-4">Info</h3>
          <ul className="space-y-2">
            <li>Search</li>
            <li>Return & Exchange Policy</li>
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
            <li>Shipping Policy</li>
            <li>Blogs</li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="font-bold text-lg mb-4">Social Media</h3>
          <div className="flex space-x-4 text-xl">
            <FaFacebookF className="hover:text-[#FFA0A0] cursor-pointer" />
            <FaInstagram className="hover:text-[#FFA0A0] cursor-pointer" />
            <FaTwitter className="hover:text-[#FFA0A0] cursor-pointer" />
            <FaLinkedinIn className="hover:text-[#FFA0A0] cursor-pointer" />
          </div>
        </div>

        {/* Subscribe */}
        <div>
          <h3 className="font-bold text-lg mb-4">Lets stay in touch !</h3>
          <p className="mb-4">Sign up for exclusive offers, stories & more</p>
          <form onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 mb-4 text-black rounded-md"
            />
            <button
              type="submit"
              className="bg-white text-[#2F4F4F] px-6 py-2 rounded-md font-bold hover:bg-[#FFA0A0] hover:text-white transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Popup at Top */}
      {popup && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-[#2F4F4F] text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-bounce">
          <FaCheckCircle className="text-green-400 text-xl" />
          <span>{popup}</span>
        </div>
      )}

      {/* Confetti */}
      {showConfetti && <Confetti recycle={false} numberOfPieces={400} />}
    </footer>
  );
};

export default Footer;
