import React, { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({
    email: "",
    username: "",
    password1: "",
    password2: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/registration/", {
        username: form.username,
        email: form.email,
        password1: form.password1,
        password2: form.password2,
      });
      alert("Registered successfully. Check your email.");
      navigate("/login");
    } catch (err) {
      console.error(err.response?.data || err);
      alert(
        "Registration failed: " +
          JSON.stringify(err.response?.data, null, 2)
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-md rounded-xl max-w-md w-full p-6">
        <div className="flex mb-6">
          <button
            onClick={() => navigate("/login")}
            className="w-1/2 py-2 bg-gray-200 font-semibold rounded-l-lg"
          >
            Log in
          </button>
          <button className="w-1/2 py-2 bg-[#264d4d] text-white font-semibold rounded-r-lg">
            Register
          </button>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block font-semibold">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full border border-gray-400 px-3 py-2 rounded-md"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block font-semibold">Username</label>
            <input
              type="text"
              name="username"
              placeholder="Choose a username"
              className="w-full border border-gray-400 px-3 py-2 rounded-md"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block font-semibold">Password</label>
            <input
              type="password"
              name="password1"
              placeholder="Enter password"
              className="w-full border border-gray-400 px-3 py-2 rounded-md"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block font-semibold">Confirm Password</label>
            <input
              type="password"
              name="password2"
              placeholder="Confirm password"
              className="w-full border border-gray-400 px-3 py-2 rounded-md"
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#264d4d] text-white py-2 rounded-lg font-semibold"
          >
            Register
          </button>
        </form>

        <div className="text-center my-4 font-bold">Or</div>

        <button className="w-full border border-gray-400 py-2 rounded-md flex items-center justify-center gap-2">
          Continue with Google{" "}
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
        </button>

        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-red-600 cursor-pointer"
          >
            Log in
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
