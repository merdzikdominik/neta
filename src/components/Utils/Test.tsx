import React, { useState, useEffect } from "react";
import { render } from "react-dom";

interface HoverTextProps {
  position: { x: number; y: number };
}

const HoverText: React.FC<HoverTextProps> = ({ position }) => {
  return (
    <div style={{ position: "absolute", top: position.y, left: position.x }}>
      Hovering right meow!
      <span role="img" aria-label="cat">
        🐱
      </span>
    </div>
  );
};

const HoverExample: React.FC = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  const handleMouseMove = (event: MouseEvent) => {
    setMousePosition({ x: event.clientX, y: event.clientY });
  };

  useEffect(() => {
    if (isHovering) {
      window.addEventListener("mousemove", handleMouseMove);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isHovering]);

  return (
    <div>
      <div
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        style={{ height: "200px", width: "200px", backgroundColor: "lightblue" }}
      >
        Hover Me
      </div>
      {isHovering && <HoverText position={mousePosition} />}
    </div>
  );
};

export default HoverExample;

// Do renderowania w ReactDOM użyj:
// render(<HoverExample />, document.getElementById("root"));
