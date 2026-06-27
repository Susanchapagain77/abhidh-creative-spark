import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Resets the window scroll position to the top whenever the route changes
 * (and on the initial mount / page refresh). Without this, React Router keeps
 * the previous scroll offset and the browser restores the prior position on
 * refresh, leaving the user stuck mid-page instead of at the top.
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  // Opt out of the browser's automatic scroll restoration so a refresh starts
  // at the top rather than wherever the user last scrolled.
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
