import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Handles clicking a link like "/#contact" from anywhere on the site.
// React Router doesn't auto-scroll to hash targets on its own, and the
// target section only mounts once its own data fetch finishes - so this
// retries for a few seconds, not just a couple of frames, to comfortably
// cover that fetch delay.
export default function ScrollToHash() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;

    const id = location.hash.replace("#", "");
    const deadline = Date.now() + 5000;

    function tryScroll() {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
      if (Date.now() < deadline) {
        setTimeout(tryScroll, 100);
      }
    }

    tryScroll();
  }, [location.pathname, location.hash]);

  return null;
}