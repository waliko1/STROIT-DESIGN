import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Projects = () => {
  const [config, setConfig] = useState(null);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    fetch("/projectsPage.json")
      .then((response) => response.json())
      .then((data) => setConfig(data))
      .catch((error) => console.error("Error loading config:", error));

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!config)
    return (
      <div
        style={{
          minHeight: "calc(100vh - 140px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#1F1F1F",
          color: "#F1EADA",
        }}
      >
        Loading Projects...
      </div>
    );

  const isMobile = windowSize.width < 768;
  const isTablet = windowSize.width >= 768 && windowSize.width < 1024;

  return (
    <div
      style={{
        backgroundColor: "#0a0a0a",
        color: "#F1EADA",
        minHeight: "calc(100vh - 140px)",
        padding: isMobile
          ? "1.5rem 1rem"
          : isTablet
          ? "2rem 1.5rem"
          : "3rem 2rem",
      }}
    >
      {/* Header Section */}
      <div
        style={{
          textAlign: "center",
          marginBottom: isMobile ? "2rem" : "3rem",
          maxWidth: "800px",
          margin: "0 auto 3rem auto",
        }}
      >
        <h1
          style={{
            fontSize: isMobile ? "2.2rem" : isTablet ? "2.8rem" : "3.5rem",
            fontWeight: 300,
            color: "#F1EADA",
            marginBottom: "1rem",
            letterSpacing: "1px",
          }}
        >
          {config.projects.title}
        </h1>
        <div
          style={{
            height: "2px",
            width: "80px",
            backgroundColor: "#B59E7D",
            margin: "0 auto",
          }}
        ></div>
      </div>

      {/* Projects Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile
            ? "1fr"
            : isTablet
            ? "repeat(2, 1fr)"
            : "repeat(3, 1fr)",
          gap: isMobile ? "1.5rem" : "2rem",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        {config.projects.items.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            isMobile={isMobile}
            isTablet={isTablet}
          />
        ))}
      </div>
    </div>
  );
};

// Separate Project Card Component for better organization
const ProjectCard = ({ project, isMobile, isTablet }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link to={`/project/${project.id}`} style={{ textDecoration: "none" }}>
      <div
        style={{
          backgroundColor: "#171717",
          borderRadius: "12px",
          overflow: "hidden",
          transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          cursor: "pointer",
          border: "1px solid #2A2A2A",
          transform: isHovered ? "translateY(-8px)" : "translateY(0)",
          boxShadow: isHovered
            ? "0 20px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(181, 158, 125, 0.1)"
            : "0 4px 20px rgba(0,0,0,0.2)",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container */}
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            height: isMobile ? "250px" : "300px",
          }}
        >
          <img
            src={project.image}
            alt={project.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 0.6s ease",
              transform: isHovered ? "scale(1.05)" : "scale(1)",
            }}
          />
          {/* Overlay */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background:
                "linear-gradient(to bottom, transparent 60%, rgba(10,10,10,0.8) 100%)",
              opacity: isHovered ? 0.8 : 0.6,
              transition: "opacity 0.4s ease",
            }}
          ></div>

          {/* View Project Button */}
          <div
            style={{
              position: "absolute",
              bottom: "1.5rem",
              left: "1.5rem",
              right: "1.5rem",
              opacity: isHovered ? 1 : 0,
              transform: isHovered ? "translateY(0)" : "translateY(10px)",
              transition: "all 0.3s ease",
            }}
          >
            <span
              style={{
                color: "#B59E7D",
                fontSize: "0.9rem",
                fontWeight: 500,
                letterSpacing: "1px",
              }}
            >
              VIEW PROJECT →
            </span>
          </div>
        </div>

        {/* Content */}
        <div
          style={{
            padding: isMobile ? "1.5rem" : "2rem",
          }}
        >
          <h3
            style={{
              color: "#F1EADA",
              marginBottom: "0.8rem",
              fontSize: isMobile ? "1.3rem" : "1.5rem",
              fontWeight: 500,
              lineHeight: 1.3,
            }}
          >
            {project.title}
          </h3>
          <p
            style={{
              color: "#CEC1A8",
              fontSize: isMobile ? "0.95rem" : "1rem",
              lineHeight: 1.6,
              fontWeight: 300,
            }}
          >
            {project.shortDescription}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Projects;
