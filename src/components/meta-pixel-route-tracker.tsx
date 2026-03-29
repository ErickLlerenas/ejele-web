import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

/**
 * Re-fires Meta Pixel and Google Analytics PageView on SPA navigations (initial PageView is in index.html).
 */
export function MetaPixelRouteTracker() {
  const { pathname } = useLocation();
  const isFirstPath = useRef(true);

  useEffect(() => {
    if (isFirstPath.current) {
      isFirstPath.current = false;
      return;
    }
    // Meta Pixel
    if (typeof window.fbq === "function") {
      window.fbq("track", "PageView");
    }
    // Google Analytics
    if (typeof window.gtag === "function") {
      window.gtag("config", "G-TLHNQGLC05", {
        page_path: pathname,
      });
    }
  }, [pathname]);

  return null;
}
