import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import Logo from "./assets/Study.png";
import SideBar from "./assets/sidebar-2-32.png";
import "./hostLogin.css";

export default function HostLogin({ type }) {
  const { id } = useParams();
  const [user, setUser] = useState("");
  const [listings, setListings] = useState([]);
  const [slidebarOpen, setSlidebarOpen] = useState(false);
  const slidebarRef = useRef(null);
  const navigate = useNavigate();

  const handleBecomeHost = () => {
    if (type === "Host" && id) navigate(`/host/${id}`);
    else navigate("/login");
  };

  const handleFindHost = () => {
    if (type === "Host") navigate("/findHost");
    else navigate("/login");
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (slidebarRef.current && !slidebarRef.current.contains(e.target)) {
        setSlidebarOpen(false);
      }
    };
    if (slidebarOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [slidebarOpen]);

  useEffect(() => {
    async function fetchHostData() {
      try {
        const res = await fetch(`/api/host-listings/${id}`);
        const data = await res.json();
        setListings(data);

        if (data.length > 0) {
          setUser(`Host-${id.substring(0, 5)}`); 
        } else {
          setUser("");
        }
      } catch (err) {
        console.error("Error fetching host listings:", err);
      }
    }
    fetchHostData();
  }, [id]);

  return (
    <>
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
              <div className="sidebar-option" onClick={handleBecomeHost}>
                <strong>Become a host</strong>
                <p>It's easy to start hosting and earn extra income.</p>
              </div>
              <div className="sidebar-option" onClick={handleFindHost}>
                Find a co-host
              </div>
              <div className="sidebar-option" onClick={handleLogout}>
                Logout
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          className="host"
          onClick={handleBecomeHost}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, type: "spring", stiffness: 100 }}
        >
          <p>Be a Host!</p>
        </motion.div>
      </motion.div>

      <div className="host-login-container">
  <h1>Welcome, {user || "Host"}</h1>
  <h2>Your Hosted Spaces</h2>

  {listings.length > 0 ? (
    <div className="listing-cards">
      {listings.map((listing) => (
        <div key={listing._id} className="listing-card">
          <h3>{listing.name}</h3>
          <p>{listing.city}</p>
        </div>
      ))}
    </div>
  ) : (
    <p>You haven't hosted any places yet.</p>
  )}

  <button className="host-new-place-btn" onClick={handleBecomeHost}>
    + Host a New Place
  </button>
</div>

    </>
  );
}
