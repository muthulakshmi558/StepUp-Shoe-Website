import React, { useState, useContext } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/token/", { username: form.email, password: form.password });
      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);
      setUser({ loggedIn: true });
      alert("Logged in successfully");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Login failed. Check email/password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form onSubmit={handleLogin} className="bg-white shadow-md rounded-xl max-w-md w-full p-6">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <input type="email" name="email" placeholder="Email" className="w-full mb-4 border px-3 py-2 rounded-md" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" className="w-full mb-4 border px-3 py-2 rounded-md" onChange={handleChange} required />
        <button type="submit" className="w-full bg-[#264d4d] text-white py-2 rounded-lg">Login</button>
      </form>
    </div>
  );
};

export default Login;
