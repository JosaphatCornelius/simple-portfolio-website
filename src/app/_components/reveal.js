"use client";

import { useEffect, useRef, useState } from "react";

const FLIGHT_VECTORS = {
  left: { "--reveal-x": "-84px", "--reveal-rot": "-3deg" },
  right: { "--reveal-x": "84px", "--reveal-rot": "2deg" },
  up: { "--reveal-y": "64px", "--reveal-rot": "-1deg" },
  down: { "--reveal-y": "-64px", "--reveal-rot": "1deg" },
};

// Renders visible on the server so content survives without JavaScript; the
// observer then hides whatever is off-screen and animates it on scroll.
export function Reveal({ from = "left", delay = 0, className = "", children }) {
  const ref = useRef(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setHidden(!entry.isIntersecting),
      { rootMargin: "-6% 0px" },
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-hidden={hidden ? "" : undefined}
      className={`reveal ${className}`}
      style={{ ...FLIGHT_VECTORS[from], "--reveal-delay": `${delay}ms` }}
    >
      {children}
    </div>
  );
}
