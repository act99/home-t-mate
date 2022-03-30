import { debounce, throttle } from "lodash";
import React, { useRef } from "react";

function useWindowSize() {
  const windowRef = useRef(false);
  const [windowSize, setWindowSize] = React.useState({
    width: undefined,
    height: undefined,
  });
  React.useEffect(() => {
    const handleResize = debounce(() => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }, 1000);
    window.addEventListener("resize", handleResize);
    // window.addEventListener("resize", handleResize);

    handleResize();
    return () => {
      handleResize.cancel();
      window.removeEventListener("resize", handleResize);
      windowRef.current = true;
    };
  }, []);
  return windowSize;
}

export default useWindowSize;
