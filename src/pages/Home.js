import React, { useState, useEffect } from "react";

const Home = () => {
  const [config, setConfig] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [backgroundLoaded, setBackgroundLoaded] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    fetch("/homePage.json")
      .then((response) => response.json())
      .then((data) => setConfig(data))
      .catch((error) => console.error("Error loading config:", error));
  }, []);

  // Preload images for smooth transitions
  useEffect(() => {
    if (!config) return;
    const preloadImages = config.home.slides.map((slide) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = slide.backgroundImage;
        img.onload = resolve;
        img.onerror = resolve;
      });
    });
    Promise.all(preloadImages).then(() => setBackgroundLoaded(true));
  }, [config]);

  // Auto-slide every 5 seconds
  useEffect(() => {
    if (!config || !backgroundLoaded) return;
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex(
          (prevIndex) => (prevIndex + 1) % config.home.slides.length
        );
        setTimeout(() => setFade(true), 150);
      }, 700);
    }, 5000);
    return () => clearInterval(interval);
  }, [config, backgroundLoaded]);

  if (!config)
    return (
      <div
        style={{
          height: "calc(100vh - 140px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#171717",
          color: "#F1EADA",
        }}
      >
        Loading...
      </div>
    );

  const currentSlide = config.home.slides[currentIndex];
  const alignment = currentSlide.alignment || "left";
  const isMobile = windowSize.width < 768;
  const isTablet = windowSize.width >= 768 && windowSize.width < 1024;

  // Responsive alignment styles
  const alignmentStyles = {
    display: "flex",
    flexDirection: "column",
    alignItems: isMobile
      ? "center"
      : alignment === "center"
      ? "center"
      : alignment === "right"
      ? "flex-end"
      : "flex-start",
    textAlign: isMobile
      ? "center"
      : alignment === "center"
      ? "center"
      : alignment === "right"
      ? "right"
      : "left",
    margin: isMobile
      ? "0 auto"
      : alignment === "right"
      ? "0 0 0 auto"
      : "0 auto 0 0",
    maxWidth: isMobile ? "90%" : isTablet ? "85%" : "900px",
    width: "100%",
  };

  // Responsive font sizes
  const titleSize = isMobile ? "2.2rem" : isTablet ? "3rem" : "3.8rem";
  const subtitleSize = isMobile ? "1.6rem" : isTablet ? "2rem" : "2.4rem";
  const descriptionSize = isMobile ? "1.1rem" : isTablet ? "1.3rem" : "1.4rem";

  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        height: isMobile ? "calc(100vh - 120px)" : "calc(100vh - 140px)",
        display: "flex",
        alignItems: "center",
        justifyContent: isMobile
          ? "center"
          : alignment === "center"
          ? "center"
          : alignment === "right"
          ? "flex-end"
          : "flex-start",
        padding: isMobile ? "1.5rem" : isTablet ? "2.5rem" : "4rem",
        color: "#F1EADA",
      }}
    >
      {/* Background image with blur */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${currentSlide.backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(2px) brightness(0.75)",
          transform: fade ? "scale(1)" : "scale(1.03)",
          transition:
            "filter 1.5s ease, transform 1.8s ease, opacity 1.2s ease",
          opacity: fade ? 1 : 0.9,
          zIndex: 0,
        }}
      ></div>

      {/* Responsive overlay for text clarity */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: isMobile
            ? "linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 100%)"
            : "linear-gradient(120deg, rgba(0,0,0,0.6) 10%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0.2) 90%)",
          zIndex: 1,
        }}
      ></div>

      {/* Text section */}
      <div
        style={{
          ...alignmentStyles,
          position: "relative",
          zIndex: 2,
          opacity: fade ? 1 : 0,
          transform: fade
            ? "translateY(0)"
            : isMobile
            ? "translateY(15px)"
            : alignment === "center"
            ? "translateY(20px)"
            : "translateX(-20px)",
          transition:
            "opacity 1.2s ease, transform 1.2s cubic-bezier(0.25,0.46,0.45,0.94)",
        }}
      >
        <h1
          style={{
            fontSize: titleSize,
            fontWeight: 700,
            marginBottom: isMobile ? "0.8rem" : "1rem",
            textShadow: "0 6px 16px rgba(0,0,0,0.7)",
            letterSpacing: isMobile ? "0.5px" : "1px",
            lineHeight: 1.2,
          }}
        >
          {currentSlide.title}
        </h1>
        <h2
          style={{
            fontSize: subtitleSize,
            fontWeight: 500,
            color: "#C3A982",
            marginBottom: isMobile ? "1rem" : "1.2rem",
            textShadow: "0 3px 12px rgba(0,0,0,0.6)",
            lineHeight: 1.3,
          }}
        >
          {currentSlide.subtitle}
        </h2>
        <p
          style={{
            fontSize: descriptionSize,
            maxWidth: isMobile ? "100%" : isTablet ? "90%" : "700px",
            color: "#F7EFE0",
            lineHeight: 1.6,
            textShadow: "0 2px 6px rgba(0,0,0,0.5)",
            fontWeight: 300,
          }}
        >
          {currentSlide.description}
        </p>
      </div>

      {/* Slide indicator dots - hidden on very small screens */}
      {windowSize.width > 480 && (
        <div
          style={{
            position: "absolute",
            bottom: isMobile ? "1.5rem" : "2rem",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: "0.8rem",
            zIndex: 3,
          }}
        >
          {config.home.slides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setFade(false);
                setTimeout(() => {
                  setCurrentIndex(index);
                  setFade(true);
                }, 400);
              }}
              style={{
                width: isMobile ? "10px" : "12px",
                height: isMobile ? "10px" : "12px",
                borderRadius: "50%",
                border: "none",
                backgroundColor:
                  index === currentIndex
                    ? "#C3A982"
                    : "rgba(241, 234, 218, 0.4)",
                cursor: "pointer",
                transition: "all 0.3s ease",
                transform: index === currentIndex ? "scale(1.3)" : "scale(1)",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
