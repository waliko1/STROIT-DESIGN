import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <header
      style={{
        backgroundColor: "#171717",
        color: "#F1EADA",
        padding: isMobile ? "1rem" : "1.3rem 2rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid #B59E7D",
        position: "relative",
      }}
    >
      <div
        style={{
          fontSize: isMobile ? "1.2rem" : "1.5rem",
          fontWeight: "bold",
        }}
      >
        STROIT GROUP
      </div>

      {/* Mobile Menu Button */}
      {isMobile ? (
        <>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: "none",
              border: "none",
              color: "#F1EADA",
              fontSize: "1.5rem",
              cursor: "pointer",
            }}
          >
            ☰
          </button>

          {/* Mobile Menu Dropdown */}
          {menuOpen && (
            <nav
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                right: 0,
                backgroundColor: "#171717",
                display: "flex",
                flexDirection: "column",
                borderTop: "1px solid #B59E7D",
                zIndex: 1000,
              }}
            >
              <Link
                to="/"
                style={{
                  color: "#F1EADA",
                  padding: "1rem",
                  textDecoration: "none",
                  borderBottom: "1px solid #2A2A2A",
                }}
                onClick={() => setMenuOpen(false)}
              >
                HOME
              </Link>
              <Link
                to="/about"
                style={{
                  color: "#F1EADA",
                  padding: "1rem",
                  textDecoration: "none",
                  borderBottom: "1px solid #2A2A2A",
                }}
                onClick={() => setMenuOpen(false)}
              >
                ABOUT
              </Link>
              <Link
                to="/projects"
                style={{
                  color: "#F1EADA",
                  padding: "1rem",
                  textDecoration: "none",
                  borderBottom: "1px solid #2A2A2A",
                }}
                onClick={() => setMenuOpen(false)}
              >
                PROJECTS
              </Link>
              <Link
                to="/contact"
                style={{
                  color: "#F1EADA",
                  padding: "1rem",
                  textDecoration: "none",
                }}
                onClick={() => setMenuOpen(false)}
              >
                CONTACT
              </Link>
            </nav>
          )}
        </>
      ) : (
        // Desktop Navigation
        <nav>
          <Link
            to="/"
            style={{
              color: "#F1EADA",
              margin: "0 1rem",
              textDecoration: "none",
              fontSize: "0.95rem",
            }}
          >
            HOME
          </Link>
          <Link
            to="/about"
            style={{
              color: "#F1EADA",
              margin: "0 1rem",
              textDecoration: "none",
              fontSize: "0.95rem",
            }}
          >
            ABOUT
          </Link>
          <Link
            to="/projects"
            style={{
              color: "#F1EADA",
              margin: "0 1rem",
              textDecoration: "none",
              fontSize: "0.95rem",
            }}
          >
            PROJECTS
          </Link>
          <Link
            to="/contact"
            style={{
              color: "#F1EADA",
              margin: "0 1rem",
              textDecoration: "none",
              fontSize: "0.95rem",
            }}
          >
            CONTACT
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Header;
