import React, { useState, useEffect } from "react";
import api from "../utils/api";

export default function TopAdsSection() {
  const [topAds, setTopAds] = useState([]);

  useEffect(() => {
    async function fetchAds() {
      try {
        const res = await api.get("/ads");
        const data = res.data;

        if (Array.isArray(data)) {
          // Filter only top ads and sort by order
          const top = data
            .filter((ad) => ad.position === "top")
            .sort((a, b) => a.order - b.order);
          setTopAds(top);
        } else {
          console.error("Backend did not return an array:", data);
        }
      } catch (err) {
        console.error("Error fetching top ads:", err);
      }
    }

    fetchAds();
  }, []);

  if (topAds.length === 0) return null; // Hide section if no top ads

  return (
    <section className="ads-container" style={{ marginTop: 5, marginBottom: 5 }}>
      {topAds.map((ad, index) => (
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
            <div dangerouslySetInnerHTML={{ __html: ad.content }} />
          </div>
        </div>
      ))}
    </section>
  );
}
