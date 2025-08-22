import "./intro.css";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Intro({ type }) {
  const [user, setUser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("/api/home");
        const data = await res.json();
        setUser(data.user || "");
      } catch (err) {
        console.log(err);
      }
    }
    fetchUser();
  }, []);

  const goToHostPage = () => {
    const hostId = localStorage.getItem("userId");
    if (hostId) {
      navigate(`/host/${hostId}`);
    }
  };

  return (
    <>
      {type === "Host" && (
        <motion.div
          className="home-wrapper"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="home-content">
            <h1 className="home-title">Welcome to StudyBnB {user}</h1>
            <p className="home-subtitle">Provide your Space for better future</p>
            <div className="home-buttons" onClick={goToHostPage}>
              Add Hostels or PGs as per the Location
            </div>
          </div>
        </motion.div>
      )}

      {(type === "Visitor"|| type === "") && (
        <motion.div
          className="home-wrapper"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="home-content">
            <h1 className="home-title">Welcome to StudyBnB {type === "Visitor" && user ? `, ${user}` : ""}</h1>
            <p className="home-subtitle">Find your Space for better future</p>
            <div className="home-buttons">
              Find Hostels or PGs as per the Location
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
}
