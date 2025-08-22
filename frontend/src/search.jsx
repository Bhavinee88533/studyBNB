import { useState, useEffect } from "react";
import Content from "./content.jsx";
import "./search.css";

export default function Search({ city, address, type }) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  async function showContent() {
    try {
      setLoading(true); // start loading
      const res = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ city, address, type })
      });

      if (!res.ok) throw new Error("Search request failed");

      const data = await res.json();
      setResults(data.results || []);
      console.log("Number of results:", data.results?.length || 0);
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setLoading(false); // stop loading
    }
  }

  useEffect(() => {
    if (city || address || type) {
      showContent();
    }
  }, [city, address, type]);

  return (
    <div className="container">
      {loading ? (
        <p style={{ backgroundColor: "#9e9c9cff", color: "white", borderRadius: "5px", padding: "10px" }}>
          Loading...
        </p>
      ) : results.length > 0 ? (
        results.map((item) => (
          <Content
            key={item._id}
            _id={item._id}
            name={item.name}
            type={item.type}
            images={item.images || []}
          />
        ))
      ) : (
        <p style={{ backgroundColor: "#9e9c9cff", color: "white", borderRadius: "5px", padding: "10px" }}>
          Sorry, we haven't reached that far yet.
        </p>
      )}
    </div>
  );
}
