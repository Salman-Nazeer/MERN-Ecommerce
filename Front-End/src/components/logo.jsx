import { useState } from "react";

const EShopmartLogo = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isDark] = useState(false); // Can be dynamic

  const styles = {
    logoContainer: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem", // Responsive spacing
      fontFamily: "'Poppins', sans-serif",
      fontWeight: 700,
      cursor: "pointer",
      filter: isDark ? "invert(1)" : "none",
    },
    eSymbol: {
      background: "#2962ff",
      color: "white",
      width: "clamp(32px, 4vw, 48px)", // Adjusts based on screen size
      height: "clamp(32px, 4vw, 48px)",
      borderRadius: "8px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "clamp(16px, 2vw, 24px)", // Dynamic font size
      position: "relative",
      overflow: "hidden",
      transform: isHovered ? "rotate(360deg)" : "rotate(0deg)",
      transition: "transform 0.5s ease",
    },
    orangeLine: {
      position: "absolute",
      width: "100%",
      height: "2px",
      background: "#ff6d00",
      bottom: "0",
      left: "0",
    },
    logoText: {
      display: "flex",
      flexDirection: "column",
      lineHeight: 1,
    },
    shopText: {
      color: "#2d3436",
      fontSize: "clamp(18px, 3vw, 24px)", // Scales with screen
      letterSpacing: "-0.5px",
    },
    martText: {
      color: isHovered ? "#ff6d00" : "#2962ff",
      fontSize: "clamp(16px, 2.5vw, 20px)", // Scales with screen
      marginTop: "-2px",
      transition: "color 0.3s ease",
    },
  };

  return (
    <div
      style={styles.logoContainer}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={styles.eSymbol}>
        E
        <div style={styles.orangeLine} />
      </div>
      <div style={styles.logoText}>
        <span style={styles.shopText}>SHOP</span>
        <span style={styles.martText}>MART</span>
      </div>
    </div>
  );
};

export default EShopmartLogo;
