import React, { useState, useEffect } from "react";

const Contact = () => {
  const [config, setConfig] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    fetch("/contactPage.json")
      .then((response) => response.json())
      .then((data) => setConfig(data))
      .catch((error) => console.error("Error loading config:", error));
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    alert("Message sent! This would normally send to the company email.");
    setFormData({ name: "", email: "", message: "" });
  };

  if (!config) return <div>Loading...</div>;

  return (
    <div
      style={{
        backgroundColor: "#1F1F1F",
        color: "#F1EADA",
        minHeight: "calc(100vh - 140px)",
        padding: "2rem",
        display: "flex",
        gap: "3rem",
        maxWidth: "1200px",
        margin: "3rem auto",
        border: "1px #B59E7D solid",
      }}
    >
      {/* Contact Information */}
      <div style={{ flex: 1 }}>
        <h1 style={{ color: "#B59E7D", marginBottom: "2rem" }}>
          {config.contact.title}
        </h1>

        <div style={{ marginBottom: "2rem" }}>
          <h3 style={{ color: "#B59E7D", marginBottom: "0.5rem" }}>Address</h3>
          <p>{config.contact.address}</p>
        </div>

        <div style={{ marginBottom: "2rem" }}>
          <h3 style={{ color: "#B59E7D", marginBottom: "0.5rem" }}>Email</h3>
          <p>{config.contact.email}</p>
        </div>

        <div style={{ marginBottom: "2rem" }}>
          <h3 style={{ color: "#B59E7D", marginBottom: "0.5rem" }}>Phone</h3>
          <p>{config.contact.phone}</p>
        </div>
      </div>

      {/* Contact Form */}
      <div style={{ flex: 1 }}>
        <form
          onSubmit={handleSubmit}
          style={{
            backgroundColor: "#2A2A2A",
            padding: "2rem",
            borderRadius: "8px",
          }}
        >
          <div style={{ marginBottom: "1rem" }}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "0.75rem",
                backgroundColor: "#1F1F1F",
                border: "1px solid #B59E7D",
                borderRadius: "4px",
                color: "#F1EADA",
              }}
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "0.75rem",
                backgroundColor: "#1F1F1F",
                border: "1px solid #B59E7D",
                borderRadius: "4px",
                color: "#F1EADA",
              }}
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <textarea
              name="message"
              placeholder="Your Message"
              rows="6"
              value={formData.message}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "0.75rem",
                backgroundColor: "#1F1F1F",
                border: "1px solid #B59E7D",
                borderRadius: "4px",
                color: "#F1EADA",
                resize: "vertical",
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              padding: "0.75rem 2rem",
              backgroundColor: "#B59E7D",
              border: "none",
              borderRadius: "4px",
              color: "#171717",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
