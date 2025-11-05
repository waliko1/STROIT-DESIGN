import React, { useState, useEffect } from "react";

const Footer = () => {
  const [config, setConfig] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    fetch("/config.json")
      .then((response) => response.json())
      .then((data) => setConfig(data))
      .catch((error) => console.error("Error loading config:", error));

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  if (!config) return <footer>Loading...</footer>;

  return (
    <footer
      style={{
        backgroundColor: "#171717",
        color: "#F1EADA",
        padding: isMobile ? "1.5rem 1rem" : "2rem",
        textAlign: "center",
        borderTop: "1px solid #B59E7D",
      }}
    >
      <div style={{ marginBottom: "1rem" }}>
        <div
          style={{
            marginBottom: "0.5rem",
            fontSize: isMobile ? "0.9rem" : "1rem",
          }}
        >
          {config.company.email}
        </div>
        <div
          style={{
            marginBottom: "1rem",
            fontSize: isMobile ? "0.9rem" : "1rem",
          }}
        >
          {config.company.phone}
        </div>

        <div
          style={{
            marginBottom: "1rem",
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
          }}
        >
          <input
            type="email"
            placeholder="Email for updates"
            style={{
              padding: "0.5rem",
              backgroundColor: "#2A2A2A",
              border: "1px solid #B59E7D",
              color: "#F1EADA",
              width: isMobile ? "100%" : "250px",
              fontSize: isMobile ? "0.9rem" : "1rem",
            }}
          />
          <button
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "#B59E7D",
              border: "none",
              color: "#171717",
              cursor: "pointer",
              fontSize: isMobile ? "0.9rem" : "1rem",
              width: isMobile ? "100%" : "auto",
            }}
          >
            subscribe
          </button>
        </div>

        <div style={{ fontSize: isMobile ? "0.8rem" : "0.9rem" }}>
          {config.company.copyright}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
