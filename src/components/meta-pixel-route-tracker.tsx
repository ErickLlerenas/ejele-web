import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

/**
 * Re-fires Meta Pixel PageView on SPA navigations (initial PageView is in index.html).
 */
export function MetaPixelRouteTracker() {
  const { pathname } = useLocation();
  const isFirstPath = useRef(true);

  useEffect(() => {
    if (isFirstPath.current) {
      isFirstPath.current = false;
      return;
    }
    if (typeof window.fbq === "function") {
      window.fbq("track", "PageView");
    }
  }, [pathname]);

  return null;
}
