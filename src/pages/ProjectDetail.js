import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const ProjectDetail = () => {
  const { id } = useParams();
  const [config, setConfig] = useState(null);
  const [project, setProject] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
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
      .then((data) => {
        setConfig(data);
        const foundProject = data.projects.items.find(
          (p) => p.id === parseInt(id)
        );
        setProject(foundProject);
        // Set the main project image as first in gallery view
        if (foundProject) {
          setSelectedImage(0);
        }
      })
      .catch((error) => console.error("Error loading config:", error));

    return () => window.removeEventListener("resize", handleResize);
  }, [id]);

  if (!project)
    return (
      <div
        style={{
          minHeight: "calc(100vh - 140px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0a0a",
          color: "#F1EADA",
        }}
      >
        Loading Project Details...
      </div>
    );

  const isMobile = windowSize.width < 768;
  const isTablet = windowSize.width >= 768 && windowSize.width < 1024;
  const allImages = [project.image, ...project.gallery];

  return (
    <div
      style={{
        backgroundColor: "#0a0a0a",
        color: "#F1EADA",
        minHeight: "calc(100vh - 140px)",
      }}
    >
      {/* Back Navigation */}
      <div
        style={{
          padding: isMobile ? "1.5rem 1rem 0" : "2rem 2rem 0",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        <Link
          to="/projects"
          style={{
            color: "#B59E7D",
            textDecoration: "none",
            fontSize: "0.95rem",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            marginBottom: "2rem",
          }}
        >
          ← Back to Projects
        </Link>
      </div>

      {/* Project Header */}
      <div
        style={{
          padding: isMobile ? "0 1rem 2rem" : "0 2rem 3rem",
          maxWidth: "1400px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: isMobile ? "2.5rem" : isTablet ? "3.2rem" : "4rem",
            fontWeight: 300,
            color: "#F1EADA",
            marginBottom: "1rem",
            lineHeight: 1.1,
            letterSpacing: "0.5px",
          }}
        >
          {project.title}
        </h1>
        <p
          style={{
            fontSize: isMobile ? "1.2rem" : "1.4rem",
            color: "#CEC1A8",
            maxWidth: "600px",
            margin: "0 auto",
            lineHeight: 1.6,
            fontWeight: 300,
          }}
        >
          {project.shortDescription}
        </p>
      </div>

      {/* Main Image */}
      <div
        style={{
          padding: isMobile ? "0 1rem 2rem" : "0 2rem 3rem",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
          }}
        >
          <img
            src={allImages[selectedImage]}
            alt={`${project.title} - Main view`}
            style={{
              width: "100%",
              height: isMobile ? "300px" : isTablet ? "500px" : "600px",
              objectFit: "cover",
              display: "block",
            }}
          />
        </div>
      </div>

      {/* Project Details */}
      <div
        style={{
          padding: isMobile ? "0 1rem 3rem" : "0 2rem 4rem",
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "2fr 1fr",
          gap: isMobile ? "2rem" : "4rem",
          alignItems: "start",
        }}
      >
        {/* Description */}
        <div>
          <h2
            style={{
              fontSize: isMobile ? "1.5rem" : "1.8rem",
              color: "#B59E7D",
              marginBottom: "1.5rem",
              fontWeight: 400,
              letterSpacing: "0.5px",
            }}
          >
            Project Overview
          </h2>
          <div
            style={{
              fontSize: isMobile ? "1.1rem" : "1.2rem",
              lineHeight: 1.8,
              color: "#EAE2D2",
              fontWeight: 300,
            }}
          >
            {project.fullDescription.split("\n").map((paragraph, index) => (
              <p key={index} style={{ marginBottom: "1.5rem" }}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Project Highlights */}
        <div
          style={{
            backgroundColor: "#171717",
            padding: "2rem",
            borderRadius: "12px",
            border: "1px solid #2A2A2A",
          }}
        >
          <h3
            style={{
              color: "#B59E7D",
              marginBottom: "1.5rem",
              fontSize: "1.3rem",
              fontWeight: 500,
            }}
          >
            Project Details
          </h3>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <div>
              <div
                style={{
                  color: "#CEC1A8",
                  fontSize: "0.9rem",
                  marginBottom: "0.3rem",
                }}
              >
                STATUS
              </div>
              <div style={{ color: "#F1EADA", fontSize: "1rem" }}>
                Completed
              </div>
            </div>
            <div>
              <div
                style={{
                  color: "#CEC1A8",
                  fontSize: "0.9rem",
                  marginBottom: "0.3rem",
                }}
              >
                CATEGORY
              </div>
              <div style={{ color: "#F1EADA", fontSize: "1rem" }}>
                {project.title.includes("Residence")
                  ? "Residential"
                  : "Commercial"}
              </div>
            </div>
            <div>
              <div
                style={{
                  color: "#CEC1A8",
                  fontSize: "0.9rem",
                  marginBottom: "0.3rem",
                }}
              >
                GALLERY
              </div>
              <div style={{ color: "#F1EADA", fontSize: "1rem" }}>
                {allImages.length} Images
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Gallery */}
      <div
        style={{
          padding: isMobile ? "0 1rem 3rem" : "0 2rem 4rem",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        <h2
          style={{
            fontSize: isMobile ? "1.5rem" : "1.8rem",
            color: "#B59E7D",
            marginBottom: "2rem",
            textAlign: "center",
            fontWeight: 400,
            letterSpacing: "0.5px",
          }}
        >
          Project Gallery
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile
              ? "repeat(2, 1fr)"
              : isTablet
              ? "repeat(3, 1fr)"
              : "repeat(4, 1fr)",
            gap: "1rem",
          }}
        >
          {allImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              style={{
                border: "none",
                background: "none",
                padding: 0,
                cursor: "pointer",
                borderRadius: "8px",
                overflow: "hidden",
                transition: "all 0.3s ease",
                transform: selectedImage === index ? "scale(0.95)" : "scale(1)",
                opacity: selectedImage === index ? 0.7 : 1,
              }}
            >
              <img
                src={image}
                alt={`${project.title} ${index + 1}`}
                style={{
                  width: "100%",
                  height: isMobile ? "120px" : "150px",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Navigation to next project */}
      <div
        style={{
          padding: isMobile ? "2rem 1rem" : "3rem 2rem",
          maxWidth: "1400px",
          margin: "0 auto",
          borderTop: "1px solid #2A2A2A",
          textAlign: "center",
        }}
      >
        <Link
          to="/projects"
          style={{
            color: "#B59E7D",
            textDecoration: "none",
            fontSize: "1.1rem",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "1rem 2rem",
            border: "1px solid #B59E7D",
            borderRadius: "8px",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#B59E7D";
            e.target.style.color = "#171717";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "transparent";
            e.target.style.color = "#B59E7D";
          }}
        >
          View All Projects
        </Link>
      </div>
    </div>
  );
};

export default ProjectDetail;
