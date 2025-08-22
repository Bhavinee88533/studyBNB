// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login({ setType }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
    userType: ""
  });

  const navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = await res.json();
      alert(data.message);

      if (res.ok) {
        if (form.userType === "Visitor") {
          navigate(`/visitorLogin/${data.id}`);
        }
        if (form.userType === "Host" && data.id) {
          localStorage.setItem("hostId", data.id);
          navigate(`/hostLogin/${data.id}`);
        }
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  }

  return (
    <motion.div className="content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
      <form onSubmit={handleSubmit} method="POST">
        <input type="text" name="email" placeholder="Your Mail" onChange={handleChange} required />
        <br />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <br />
        <div className="radio-buttons">
          <input type="radio" id="Visitor" name="userType" value="Visitor" onChange={(e) => { handleChange(e); setType("Visitor"); }} required />
          <label htmlFor="Visitor">Visitor</label>

          <input type="radio" id="Host" name="userType" value="Host" onChange={(e) => { handleChange(e); setType("Host"); }} required />
          <label htmlFor="Host">Host</label>
        </div>
        <br /><br />
        <button type="submit">Login</button>
        <p>Or <Link to="/signup">Sign Up</Link></p>
      </form>
    </motion.div>
  );
}
