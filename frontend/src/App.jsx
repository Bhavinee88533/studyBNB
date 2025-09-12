import Navbar from "./navBar.jsx";
import Intro from "./intro.jsx";
import Help from "./help.jsx";
import Login from "./login.jsx";
import SignUp from "./signUp.jsx";
import Host from "./host.jsx";
import FindHost from "./findHost.jsx";
import Details from "./details.jsx";
import HostLogin from "./hostLogin.jsx";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Search from "./search.jsx";

export default function App() {
  // Initialize `type` from localStorage (if present) or from hostId/visitorId fallback
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [type, setType] = useState(() => {
    const stored = localStorage.getItem("userType");
    if (stored) return stored;
    if (localStorage.getItem("hostId")) return "Host";
    if (localStorage.getItem("visitorId")) return "Visitor";
    return "";
  });

  // Keep localStorage in sync with `type`
  useEffect(() => {
    if (type) localStorage.setItem("userType", type);
    else localStorage.removeItem("userType");
  }, [type]);

  // If other parts of your app write hostId/visitorId into storage later,
  // this effect ensures `type` updates too (useful after refresh/navigation).
  useEffect(() => {
    const handleStorageSync = () => {
      const hostId = localStorage.getItem("hostId");
      const visitorId = localStorage.getItem("visitorId");
      const storedType = localStorage.getItem("userType");

      // Prefer explicit userType if present, otherwise infer from ids
      if (storedType && storedType !== type) setType(storedType);
      else if (!storedType) {
        if (hostId && type !== "Host") setType("Host");
        else if (visitorId && type !== "Visitor") setType("Visitor");
      }
    };

    // run once on mount
    handleStorageSync();

    // Listen for storage changes in case other tabs or code update it
    window.addEventListener("storage", handleStorageSync);
    return () => window.removeEventListener("storage", handleStorageSync);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar
                setCity={setCity}
                setAddress={setAddress}
                setSelectedType={setSelectedType}
                setType={setType}
                type={type}
              />
              <Intro type={type} />
            </>
          }
        />

        <Route
          path="/search"
          element={
            <>
              <Navbar
                setCity={setCity}
                setAddress={setAddress}
                setSelectedType={setSelectedType}
                setType={setType}
                type={type}
              />
              <Search city={city} address={address} type={selectedType} />
            </>
          }
        />

        <Route
          path="/help"
          element={
            <>
              <Navbar
                setCity={setCity}
                setAddress={setAddress}
                setSelectedType={setSelectedType}
                setType={setType}
                type={type}
              />
              <Help />
            </>
          }
        />

        <Route
          path="/login"
          element={
            <>
              <Navbar
                setCity={setCity}
                setAddress={setAddress}
                setSelectedType={setSelectedType}
                setType={setType}
                type={type}
              />
              <Login setType={setType} />
            </>
          }
        />

        <Route
          path="/signup"
          element={
            <>
              <Navbar
                setCity={setCity}
                setAddress={setAddress}
                setSelectedType={setSelectedType}
                setType={setType}
                type={type}
              />
              <SignUp setType={setType} />
            </>
          }
        />

        {/* HostLogin needs both type and setType so logout can reset app-wide state */}
        <Route path="/hostLogin/:id" element={<HostLogin type={type} setType={setType} />} />

        <Route
          path="/visitorLogin/:id"
          element={
            <>
              <Navbar
                setCity={setCity}
                setAddress={setAddress}
                setSelectedType={setSelectedType}
                setType={setType}
                type={type}
              />
              <Intro type={type} />
            </>
          }
        />

        <Route
          path="/host"
          element={type === "Host" ? <Host /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/host/:id"
          element={type === "Host" ? <Host /> : <Navigate to="/login" replace />}
        />

        <Route
          path="/findHost"
          element={type === "Host" ? <FindHost /> : <Navigate to="/login" replace />}
        />

        <Route path="/details/:id" element={<Details />} />
      </Routes>
    </Router>
  );
}
