import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./host.css";

export default function Host() {
  const { id } = useParams();
  const [form, setForm] = useState({
    name: "",
    email: "",
    type: "",
    address: "",
    city: "",
    contactNo: "",
    description: "",
    images: [],
  });

  const navigate = useNavigate();

  function fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  async function handleChange(e) {
    const { name, value, files, type } = e.target;
    if (type === "file") {
      const selectedFiles = Array.from(files).slice(0, 2);
      const base64Images = await Promise.all(selectedFiles.map(fileToBase64));
      setForm((prev) => ({ ...prev, images: base64Images }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!id) {
      alert("Host ID missing.");
      return;
    }
    const body = { ...form, hostId: id };
    try {
      const res = await fetch("/api/host", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      alert(data.message);
      if (res.ok) navigate(`/hostLogin/${id}`);
    } catch (err) {
      console.error(err);
      alert("Error creating listing.");
    }
  }

  return (
    <div className="host-page">
      <div className="host-box">
        <h1>Become a Host</h1>
        <p>Share your space and start earning today.</p>
        <form className="host-form" onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Your Hostel or PG Name" onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email Address" onChange={handleChange} />
          <div className="radio-buttons">
            <input type="radio" id="hostel" name="type" value="Hostel" onChange={handleChange} required />
            <label htmlFor="hostel">Hostel</label>
            <input type="radio" id="pg" name="type" value="PG" onChange={handleChange} required />
            <label htmlFor="pg">PG</label>
          </div>
          <input type="text" name="address" placeholder="Address" onChange={handleChange} required />
          <input type="text" name="city" placeholder="City" onChange={handleChange} required />
          <input type="tel" name="contactNo" placeholder="Contact Number" onChange={handleChange} required />
          <textarea name="description" rows="4" placeholder="Describe your space and pricing" onChange={handleChange} required></textarea>
          <input type="file" name="images" accept="image/*" multiple onChange={handleChange} />
          <button type="submit">Get Started</button>
        </form>
      </div>
    </div>
  );
}
