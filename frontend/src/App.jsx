import Navbar from "./navBar.jsx";
import Intro from "./intro.jsx";
import Help from "./help.jsx";
import Login from "./login.jsx";
import SignUp from "./signUp.jsx";
import Host from "./host.jsx";
import FindHost from "./findHost.jsx";
import Details from "./details.jsx";
import HostLogin from "./hostLogin.jsx";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Search from "./search.jsx";

export default function App() {
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [type, setType] = useState("");

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
              />
              <SignUp setType={setType} />
            </>
          }
        />

        <Route path="/hostLogin/:id" element={<HostLogin type={type} />} />

        <Route
          path="/visitorLogin/:id"
          element={
            <>
              <Navbar
                setCity={setCity}
                setAddress={setAddress}
                setSelectedType={setSelectedType}
              />
              <Intro type={type} />
            </>
          }
        />
        <Route path="/host" element={type === "Host" ? <Host /> : <Navigate to="/login" replace />}/>
        <Route path="/host/:id" element={type === "Host" ? <Host /> : <Navigate to="/login" replace />}/>
        
        <Route
          path="/findHost"
          element={type === "Host" ? <FindHost /> : <Navigate to="/login" replace />}
        />

        <Route path="/details/:id" element={<Details />} />
      </Routes>
    </Router>
  );
}
