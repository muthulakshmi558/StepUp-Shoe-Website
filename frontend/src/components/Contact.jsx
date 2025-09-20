import React, { useState } from "react";
import api from "../api/axios";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  // ✅ Dynamic image variable
  const contactImage = "./src/assets/images/contact.png";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/contact/", formData);
      setStatus("✅ Message sent successfully!");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      setStatus("❌ Failed to send message. Try again!");
    }
  };

  return (
    <div className="bg-white font-['Libre_Baskerville'] text-[#2F4F4F]">
      {/* Section 1: Left content + Right image */}
      <div className="grid md:grid-cols-2 gap-12 items-center py-16 px-6 lg:px-20">
        {/* Left */}
        <div>
          <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
          <div className="mb-4">
            <h3 className="text-xl font-semibold">For Online Order</h3>
            <p className="text-sm">Inquiry</p>
            <p className="font-medium">📞 +91 98765 43210</p>
          </div>

          <div className="mb-4">
            <h3 className="text-xl font-semibold">Any Other Queries</h3>
            <p className="font-medium">📞 +91 91234 56789</p>
            <p className="font-medium">📞 +91 99887 76655</p>
            <p className="text-sm">🕑 10 AM - 6 PM</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold">Email</h3>
            <p className="font-medium">customercarestepup.in@gmail.com</p>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex justify-center">
          <img
            src={contactImage} // ✅ Use variable here
            alt="Contact"
            className="w-full h-100px object-contain"
          />
        </div>
      </div>

      {/* Section 2: Enquiry Form */}
      <div className="max-w-3xl mx-auto bg-[#F9FAFB] p-8 rounded-lg shadow-md mb-16">
        <h2 className="text-2xl font-bold mb-6">Enquiry Form</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-1 font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border px-4 py-2 rounded"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border px-4 py-2 rounded"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 font-medium">Message</label>
            <textarea
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full border px-4 py-2 rounded"
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-[#2F4F4F] text-white px-6 py-2 rounded-lg hover:bg-[#FFA0A0] transition"
          >
            Send
          </button>
        </form>

        {status && (
          <p className="mt-4 font-medium text-center text-green-600">
            {status}
          </p>
        )}
      </div>
    </div>
  );
};

export default Contact;
