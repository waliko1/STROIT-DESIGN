import React, { useState, useEffect } from "react";

const About = () => {
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

    fetch("/aboutPage.json")
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
          backgroundColor: "#0a0a0a",
          color: "#F1EADA",
        }}
      >
        Loading...
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
      }}
    >
      {/* Hero Section */}
      <div
        style={{
          padding: isMobile ? "2rem 1rem" : "3rem 1.5rem",
          textAlign: "center",
          background:
            "linear-gradient(135deg, rgba(10,10,10,0.9) 0%, rgba(23,23,23,0.8) 100%)",
        }}
      >
        <h1
          style={{
            fontSize: isMobile ? "2.2rem" : isTablet ? "2.8rem" : "3.2rem",
            fontWeight: 300,
            color: "#F1EADA",
            marginBottom: "0.8rem",
            letterSpacing: "0.5px",
          }}
        >
          {config.about.title}
        </h1>
        <div
          style={{
            height: "2px",
            width: "80px",
            backgroundColor: "#B59E7D",
            margin: "0 auto",
            marginBottom: "1rem",
          }}
        ></div>
        <p
          style={{
            fontSize: isMobile ? "1.1rem" : "1.2rem",
            color: "#EAE2D2",
            maxWidth: "1200px",
            margin: "0 auto",
            lineHeight: 1.6,
            fontWeight: 300,
          }}
        >
          {config.about.subtitle}
        </p>
      </div>

      {/* STROIT GROUP BIM Section */}
      {/* <SectionWithImage
        config={config.about.stroitGroup}
        isMobile={isMobile}
        isTablet={isTablet}
        imageFirst={false}
      /> */}

      {/* Business Divisions */}
      <div
        style={{
          padding: isMobile ? "2rem 1rem" : "2.5rem 1.5rem",
          backgroundColor: "#171717",
        }}
      >
        <div
          style={{
            maxWidth: "1700px",
            margin: "0 auto",
          }}
        >
          <h2
            style={{
              fontSize: isMobile ? "1.8rem" : "2.2rem",
              color: "#B59E7D",
              textAlign: "center",
              marginBottom: "2rem",
              fontWeight: 400,
            }}
          >
            Our Business Divisions
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
              gap: "1.5rem",
            }}
          >
            {config.about.businessDivisions.map((division, index) => (
              <BusinessCard
                key={index}
                division={division}
                isMobile={isMobile}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Group Companies */}
      <div
        style={{
          padding: isMobile ? "2rem 1rem" : "2.5rem 1.5rem",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <h2
          style={{
            fontSize: isMobile ? "1.8rem" : "2.2rem",
            color: "#B59E7D",
            textAlign: "center",
            marginBottom: "2rem",
            fontWeight: 400,
          }}
        >
          Our Group Companies
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
            gap: "2rem",
            alignItems: "start",
          }}
        >
          {config.about.groupCompanies.map((company, index) => (
            <CompanyCard key={index} company={company} isMobile={isMobile} />
          ))}
        </div>
      </div>

      {/* Professional Team */}
      <div
        style={{
          padding: isMobile ? "2rem 1rem" : "2.5rem 1.5rem",
          backgroundColor: "#171717",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          <h2
            style={{
              fontSize: isMobile ? "1.8rem" : "2.2rem",
              color: "#B59E7D",
              textAlign: "center",
              marginBottom: "2rem",
              fontWeight: 400,
            }}
          >
            Meet Our Professional Team
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
              gap: "1.5rem",
            }}
          >
            {config.about.team.map((member, index) => (
              <TeamMember key={index} member={member} isMobile={isMobile} />
            ))}
          </div>
        </div>
      </div>

      {/* Accomplishments */}
      <div
        style={{
          padding: isMobile ? "2rem 1rem" : "2.5rem 1.5rem",
          maxWidth: "1500px",
          margin: "0 auto",
        }}
      >
        <h2
          style={{
            fontSize: isMobile ? "1.8rem" : "2.2rem",
            color: "#B59E7D",
            textAlign: "center",
            marginBottom: "2rem",
            fontWeight: 400,
          }}
        >
          Our Accomplishments
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
            gap: "1.5rem",
          }}
        >
          {config.about.accomplishments.map((accomplishment, index) => (
            <AccomplishmentCard
              key={index}
              accomplishment={accomplishment}
              index={index}
              isMobile={isMobile}
            />
          ))}
        </div>
      </div>

      {/* Company History Timeline */}
      <div
        style={{
          padding: isMobile ? "2rem 1rem" : "2.5rem 1.5rem",
          maxWidth: "1700px",
          margin: "0 auto",
        }}
      >
        <h2
          style={{
            fontSize: isMobile ? "1.8rem" : "2.2rem",
            color: "#B59E7D",
            textAlign: "center",
            marginBottom: "2rem",
            fontWeight: 400,
          }}
        >
          Our Journey Through Time
        </h2>

        <div
          style={{
            position: "relative",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          {/* Timeline line */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              width: "2px",
              height: "100%",
              backgroundColor: "#B59E7D",
              opacity: 0.3,
            }}
          ></div>

          {config.about.timeline.map((item, index) => (
            <TimelineItem
              key={index}
              item={item}
              index={index}
              isMobile={isMobile}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const BusinessCard = ({ division, isMobile }) => {
  return (
    <div
      style={{
        backgroundColor: "#0a0a0a",
        padding: "1.5rem",
        borderRadius: "10px",
        border: "1px solid #2A2A2A",
        height: "100%",
        transition: "all 0.3s ease",
      }}
    >
      <h3
        style={{
          color: "#B59E7D",
          fontSize: "1.2rem",
          marginBottom: "0.8rem",
          fontWeight: 500,
        }}
      >
        {division.title}
      </h3>
      <p
        style={{
          color: "#EAE2D2",
          lineHeight: 1.6,
          fontWeight: 300,
          fontSize: "0.95rem",
        }}
      >
        {division.description}
      </p>
    </div>
  );
};

const CompanyCard = ({ company, isMobile }) => {
  return (
    <div
      style={{
        backgroundColor: "#171717",
        padding: "2rem",
        borderRadius: "10px",
        border: "1px solid #2A2A2A",
        textAlign: "center",
      }}
    >
      <div
        style={{
          width: "70px",
          height: "70px",
          backgroundColor: "#B59E7D",
          borderRadius: "50%",
          margin: "0 auto 1.2rem auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.5rem",
          color: "#171717",
          fontWeight: "bold",
        }}
      >
        {company.logoText}
      </div>
      <h3
        style={{
          color: "#F1EADA",
          fontSize: "1.3rem",
          marginBottom: "0.8rem",
          fontWeight: 500,
        }}
      >
        {company.name}
      </h3>
      <p
        style={{
          color: "#CEC1A8",
          lineHeight: 1.6,
          fontWeight: 300,
          fontSize: "0.95rem",
        }}
      >
        {company.description}
      </p>
    </div>
  );
};

const TeamMember = ({ member, isMobile }) => {
  return (
    <div
      style={{
        backgroundColor: "#0a0a0a",
        padding: "1.5rem",
        borderRadius: "10px",
        border: "1px solid #2A2A2A",
        textAlign: "center",
      }}
    >
      <div
        style={{
          width: "80px",
          height: "80px",
          backgroundColor: "#2A2A2A",
          borderRadius: "50%",
          margin: "0 auto 1.2rem auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "2rem",
          color: "#B59E7D",
          fontWeight: "bold",
        }}
      >
        {member.initials}
      </div>
      <h3
        style={{
          color: "#F1EADA",
          fontSize: "1.2rem",
          marginBottom: "0.4rem",
          fontWeight: 500,
        }}
      >
        {member.name}
      </h3>
      <div
        style={{
          color: "#B59E7D",
          fontSize: "0.9rem",
          marginBottom: "0.8rem",
          fontWeight: 400,
        }}
      >
        {member.position}
      </div>
      <p
        style={{
          color: "#CEC1A8",
          lineHeight: 1.6,
          fontWeight: 300,
          fontSize: "0.9rem",
        }}
      >
        {member.description}
      </p>
    </div>
  );
};

const AccomplishmentCard = ({ accomplishment, index, isMobile }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "1.2rem",
        backgroundColor: "#171717",
        padding: "1.5rem",
        borderRadius: "10px",
        border: "1px solid #2A2A2A",
      }}
    >
      <div
        style={{
          width: "40px",
          height: "40px",
          backgroundColor: "#B59E7D",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#171717",
          fontWeight: "bold",
          fontSize: "1rem",
          flexShrink: 0,
        }}
      >
        {index + 1}
      </div>
      <p
        style={{
          color: "#EAE2D2",
          lineHeight: 1.6,
          fontWeight: 300,
          margin: 0,
          fontSize: "0.95rem",
        }}
      >
        {accomplishment}
      </p>
    </div>
  );
};

const TimelineItem = ({ item, index, isMobile }) => {
  const isEven = index % 2 === 0;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: isMobile
          ? "flex-start"
          : isEven
          ? "flex-start"
          : "flex-end",
        alignItems: "center",
        marginBottom: "2rem",
        position: "relative",
      }}
    >
      {/* Content */}
      <div
        style={{
          width: isMobile ? "100%" : "45%",
          backgroundColor: "#171717",
          padding: "1.5rem",
          borderRadius: "10px",
          border: "1px solid #2A2A2A",
          textAlign: isMobile ? "left" : isEven ? "left" : "right",
        }}
      >
        <div
          style={{
            color: "#B59E7D",
            fontSize: "1.3rem",
            fontWeight: "bold",
            marginBottom: "0.4rem",
          }}
        >
          {item.year}
        </div>
        <div
          style={{
            color: "#F1EADA",
            fontSize: "1.1rem",
            fontWeight: 500,
            marginBottom: "0.8rem",
          }}
        >
          {item.title}
        </div>
        <p
          style={{
            color: "#CEC1A8",
            lineHeight: 1.6,
            fontWeight: 300,
            fontSize: "0.95rem",
          }}
        >
          {item.description}
        </p>
      </div>

      {/* Timeline dot */}
      <div
        style={{
          position: "absolute",
          left: isMobile ? "15px" : "50%",
          transform: isMobile ? "none" : "translateX(-50%)",
          width: "16px",
          height: "16px",
          backgroundColor: "#B59E7D",
          borderRadius: "50%",
          border: "3px solid #0a0a0a",
          zIndex: 2,
        }}
      ></div>
    </div>
  );
};

export default About;
