import React, { useState, useEffect } from "react";
import api from "../utils/api";

export default function BottomAdsSection() {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    async function fetchAds() {
      try {
        const res = await api.get("/ads");
        const data = res.data;

        if (Array.isArray(data)) {
          // Filter only bottom ads
          const bottomAds = data.filter((ad) => ad.position === "bottom");
          setAds(bottomAds);
        } else {
          console.error("Backend did not return an array:", data);
        }
      } catch (err) {
        console.error("Error fetching ads:", err);
      }
    }

    fetchAds();
  }, []);

  if (ads.length === 0) return null; // Hide section if no ads

  return (
    <section
      className="ads-container"
      style={{ marginTop: 5, marginBottom: 5 }}
    >
      {ads.map((ad, index) => (
        <div key={ad._id || index} className="column-ad">
          <div
            className="card-body"
            style={{
              boxSizing: "border-box",
              flex: "1 1 auto",
              minHeight: 1,
              padding: "1rem 0.5rem",
              border: "dashed red",
              background: "linear-gradient(#FFC107, #FFFFFF)",
              borderRadius: 20,
              fontWeight: "bold",
              marginTop: 5,
              marginBottom: 5,
            }}
          >
            <div
              style={{
                width: "100%",
                overflowWrap: "break-word",
                wordWrap: "break-word",
                wordBreak: "break-word",
                overflowX: "hidden",
              }}
              dangerouslySetInnerHTML={{ __html: ad.content }}
            />
          </div>
        </div>
      ))}
    </section>
  );
}
