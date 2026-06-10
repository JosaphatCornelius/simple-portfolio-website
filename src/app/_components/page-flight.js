"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

// Exit animation (260ms) plus the longest staggered exit delay (~140ms).
const EXIT_TOTAL_MS = 420;

// Plays the P3R "component offload" before internal navigations: same-origin
// link clicks are intercepted, .page-leaving sends every .fly element off
// screen, and the route change happens once the scatter finishes. The wrapper
// is keyed by pathname so the new page's .fly elements re-mount and play
// their onload animation.
export function PageFlight({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [leaving, setLeaving] = useState(false);
  const [renderedPathname, setRenderedPathname] = useState(pathname);
  const departureRef = useRef(null);

  // Reset during render, not in an effect, so the arriving page never paints
  // a frame with .page-leaving still applied.
  if (renderedPathname !== pathname) {
    setRenderedPathname(pathname);
    setLeaving(false);
  }

  useEffect(() => {
    function interceptClick(event) {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
        return;
      const anchor =
        event.target instanceof Element ? event.target.closest("a") : null;
      if (!anchor || anchor.target || anchor.hasAttribute("download")) return;
      if (anchor.origin !== location.origin) return;
      // Same-path links only scroll (hash anchors); let them through.
      if (anchor.pathname === location.pathname) return;
      if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      event.preventDefault();
      const destination = anchor.pathname + anchor.search + anchor.hash;
      if (departureRef.current) {
        // Already mid-scatter: just retarget the pending navigation.
        departureRef.current.destination = destination;
        return;
      }
      const departure = { destination };
      departureRef.current = departure;
      setLeaving(true);
      setTimeout(() => {
        if (departureRef.current === departure) {
          departureRef.current = null;
          router.push(departure.destination);
        }
      }, EXIT_TOTAL_MS);
    }

    document.addEventListener("click", interceptClick, true);
    return () => document.removeEventListener("click", interceptClick, true);
  }, [router]);

  return (
    <div
      key={pathname}
      className={leaving ? "contents page-leaving" : "contents"}
    >
      {children}
    </div>
  );
}
