import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Handles clicking a link like "/#services" from anywhere on the site.
// React Router doesn't auto-scroll to hash targets on its own, so this
// watches the URL and scrolls to the matching element once it's mounted
// (retries a few frames in case the target page/component is still rendering).
export default function ScrollToHash() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;

    const id = location.hash.replace("#", "");
    let attempts = 0;

    function tryScroll() {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else if (attempts < 20) {
        attempts += 1;
        requestAnimationFrame(tryScroll);
      }
    }

    tryScroll();
  }, [location.pathname, location.hash]);

  return null;
}