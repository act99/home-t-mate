import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const go = useLocation();
  console.log();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [go]);

  return null;
}
