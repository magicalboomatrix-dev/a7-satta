import React, { useState, useEffect, useCallback } from "react";
import api from "../utils/api";

function ensureAnchorsOpenInNewTab(htmlString) {
  // If DOMParser isn't available (SSR), just return the string unchanged.
  if (typeof window === "undefined" || !window.DOMParser) return htmlString;

  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");

  doc.querySelectorAll("a[href]").forEach((a) => {
    // force open in new tab
    a.setAttribute("target", "_blank");
    // ensure safe rel value
    const rel = new Set((a.getAttribute("rel") || "").split(/\s+/).filter(Boolean));
    rel.add("noopener");
    rel.add("noreferrer");
    a.setAttribute("rel", Array.from(rel).join(" "));
  });

  return doc.body.innerHTML;
}

export default function TopAdsSection() {
  const [topAds, setTopAds] = useState([]);

  useEffect(() => {
    async function fetchAds() {
      try {
        const res = await api.get("/ads");
        const data = res.data;

        if (Array.isArray(data)) {
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

  if (topAds.length === 0) return null;

  return (
    <section
      className="ads-container"
      style={{
        marginTop: 5,
        marginBottom: 5,
      }}
    >
      {topAds.map((ad, index) => {
        // preprocess the ad content so anchors always open in a new tab
        const safeHtml = ensureAnchorsOpenInNewTab(ad.content || "");

        return (
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
                textAlign: "center",
              }}
            >
              <div dangerouslySetInnerHTML={{ __html: safeHtml }} />
            </div>
          </div>
        );
      })}
    </section>
  );
}
