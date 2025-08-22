import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./details.css";

export default function Details() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);

  useEffect(() => {
    if (!id) return; 
    fetch(`/api/listing/${id}`)
      .then((res) => res.json())
      .then((data) => setListing(data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!listing) {
    return <div>Loading...</div>;
  }

  return (
    <div className="details-page">
      <div className="details-header">
        <h1>{listing.name}</h1>
        <p>
          {listing.type} in {listing.city}
        </p>
      </div>

      {/* Image Gallery */}
      <div className="gallery">
        {listing.images?.map((img, i) => (
          <img key={i} src={img} alt={`${listing.name} ${i + 1}`} />
        ))}
      </div>

      {/* Info Section */}
      <div className="info-section">
        <div className="left">
          <h3>Hosted by {listing.email}</h3>
          {listing.description && <p>{listing.description}</p>}
          <p>
            <strong>Address:</strong> {listing.address}
          </p>
          <p>
            <strong>City:</strong> {listing.city}
          </p>
          {listing.contactNo && (
            <p>
              <strong>Contact No:</strong> {listing.contactNo}
            </p>
          )}
        </div>

        <div className="right">
          <div className="price-box">
            <p>
              <strong>Contact host:</strong> {listing.contactNo || "Not provided"}
            </p>
            <button>Add to Visiting</button>
            <p className="note">You won't be charged yet</p>
          </div>
        </div>
      </div>
    </div>
  );
}
