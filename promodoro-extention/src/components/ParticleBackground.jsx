import { useState, useEffect } from 'react';
import Particles from 'react-tsparticles';

const ParticleBackground = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Detect dark or light mode based on system preferences or a custom toggle
  useEffect(() => {
    const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDarkMode(prefersDarkMode);
  }, []);

  return (
    <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}>
      <Particles
        options={{
          background: {
            color: { value: isDarkMode ? "transparent" : "#f0f0f0" },  // Light mode uses soft background color
          },
          particles: {
            color: {
              value: isDarkMode ? "#91C4C4" : "#1E1E1E",  // Light green for dark mode, dark color for light mode
            },
            number: {
              value: 80,  // Increased number for better effect
              density: {
                enable: true,
                value_area: 800,
              },
            },
            size: {
              value: 4,  // Increased size for visibility
              random: true,  // Randomize size for more natural look
            },
            move: {
              enable: true,
              speed: 1.5,  // Slightly faster for dynamic movement
              direction: "none",
              random: true,
              straight: false,
            },
            opacity: {
              value: 0.5,  // Make particles slightly transparent for a subtle effect
            },
            links: {
              enable: true,
              distance: 150,  // Link particles within this range
              color: isDarkMode ? "#91C4C4" : "#1E1E1E",  // Same color for links as particles
              opacity: 0.5,
              width: 1,
            },
          },
        }}
      />
    </div>
  );
};

export default ParticleBackground;
