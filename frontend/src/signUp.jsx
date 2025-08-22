/* eslint-disable no-unused-vars */
import "./login.css";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SignUp({ setType }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    latitude: "",
    longitude: "",
    userType: ""
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setForm((prev) => ({
          ...prev,
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude
        }));
      },
      () => {}
    );
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    const { confirmPassword, ...dataToSend } = form;
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend)
      });
      const data = await res.json();
      alert(data.message);

      if (res.ok && data.id) {
        if (form.userType === "Visitor"){
          navigate("/");
        }
        if (form.userType === "Host") {
          localStorage.setItem("hostId", data.id);
          navigate(`/hostLogin/${data.id}`);
        }
      }
    } catch {
      alert("Something went wrong");
    }
  }

  return (
    <motion.div className="content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Your Name" value={form.name} onChange={handleChange} />
        <br />
        <input type="text" name="email" placeholder="Your Mail" value={form.email} onChange={handleChange} />
        <br />
        <input type="password" name="password" placeholder="Create a Password.." value={form.password} onChange={handleChange} />
        &nbsp;&nbsp;
        <input type="password" name="confirmPassword" placeholder="Rewrite Password.." value={form.confirmPassword} onChange={handleChange} />
        <br />
        <div className="radio-buttons">
          <input type="radio" id="Visitor" name="userType" value="Visitor" checked={form.userType === "Visitor"} onChange={(e) => { handleChange(e); setType("Visitor"); }} required />
          <label htmlFor="Visitor">Visitor</label>
          <input type="radio" id="Host" name="userType" value="Host" checked={form.userType === "Host"} onChange={(e) => { handleChange(e); setType("Host"); }} required />
          <label htmlFor="Host">Host</label>
        </div>
        <br />
        <button type="submit">Sign Up</button>
      </form>
    </motion.div>
  );
}
