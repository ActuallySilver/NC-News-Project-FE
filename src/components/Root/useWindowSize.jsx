import { useEffect, useState } from "react";

const UseWindowSize = () => {
  const [windowSize, setWindowSize] = useState([0, 0]);
  useEffect(() => {
    setWindowSize([window.innerWidth, window.innerHeight]);
  }, [window.innerWidth, window.innerHeight]);
  return windowSize;
};

export default UseWindowSize;
