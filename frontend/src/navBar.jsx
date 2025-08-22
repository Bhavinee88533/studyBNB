import Logo from "./assets/Study.png";
import SideBar from "./assets/sidebar-2-32.png";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./navbar.css";
import "./index.css";

export default function Navbar({ setCity, setAddress, setSelectedType }) {
  const [cityLocal, setCityLocal] = useState("");
  const [addressLocal, setAddressLocal] = useState("");
  const [slidebarOpen, setSlidebarOpen] = useState(false);
  const slidebarRef = useRef(null);
  const navigate = useNavigate();

  // Store user type and ID from localStorage
  const userType = localStorage.getItem("userType");
  const userId = localStorage.getItem("userId");

  function handleSearch(e) {
    e.preventDefault();
    setCity(cityLocal);
    setAddress(addressLocal);
    navigate("/search");
  }

  function handleTypeClick(type) {
    setSelectedType(type);
    navigate("/search");
  }

  function handleHostNavigation() {
    if (userType === "Host" && userId) {
      navigate(`/host/${userId}`); // Host dashboard
    } else {
      navigate("/host"); // Host form for new hosts
    }
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (slidebarRef.current && !slidebarRef.current.contains(e.target)) {
        setSlidebarOpen(false);
      }
    };
    if (slidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [slidebarOpen]);

  return (
    <motion.div
      className="navbar-wrapper"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="navbar-row">
        <motion.div
          className="logo"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <img src={Logo} alt="Logo" />
        </motion.div>

        <div className="choices">
          <div id="choice" onClick={() => handleTypeClick("Hostel")}>
            Hostels
          </div>
          <div id="choice" onClick={() => handleTypeClick("PG")}>
            PGs
          </div>
        </div>

        <motion.form
          className="search-form"
          onSubmit={handleSearch}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, type: "spring", stiffness: 100 }}
        >
          <input
            name="city"
            placeholder="Enter the City"
            value={cityLocal}
            onChange={(e) => setCityLocal(e.target.value)}
          />
          <input
            name="address"
            placeholder="Enter the Address"
            value={addressLocal}
            onChange={(e) => setAddressLocal(e.target.value)}
          />
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Search
          </motion.button>
        </motion.form>

        <motion.button
          className="sidebar-btn"
          onClick={() => setSlidebarOpen((prev) => !prev)}
          whileHover={{ scale: 1.1 }}
        >
          <img src={SideBar} alt="Sidebar" />
        </motion.button>
      </div>

      <AnimatePresence>
        {slidebarOpen && (
          <motion.div
            ref={slidebarRef}
            className="sidebar-menu"
            initial={{ x: 60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 10, opacity: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          >
            <div className="sidebar-option" onClick={() => navigate("/help")}>
              Help Centre
            </div>
            <div className="sidebar-option" onClick={handleHostNavigation}>
              <strong>Become a host</strong>
              <p>It's easy to start hosting and earn extra income.</p>
            </div>
            <div
              className="sidebar-option"
              onClick={() => navigate("/findHost")}
            >
              Find a co-host
            </div>
            <div
              className="sidebar-option"
              onClick={() => navigate("/login")}
            >
              Log in or sign up
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="host"
        onClick={handleHostNavigation}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7, type: "spring", stiffness: 100 }}
      >
        <p>Be a Host!</p>
      </motion.div>
    </motion.div>
  );
}
