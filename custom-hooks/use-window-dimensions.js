// This is a custom hook designed to get viewport width and height and use it to modify logic within another component
// The window dimensions are updated dynamically  
// https://stackoverflow.com/questions/36862334/get-viewport-window-height-in-reactjs
// https://chrisfrew.in/the-dreaded-referenceerror-window-is-not-defined/


// useage in a component:
// import React from 'react'
// import ReactDOM from 'react-dom'
// const Component = () => {
//   const { height, width } = useWindowDimensions();
//   return (
//     <div>
//       width: {width} ~ height: {height}
//     </div>
//   );
// };
// const rootElement = document.getElementById("root");
// ReactDOM.render(<Component />, rootElement);

// ~~~~~~~~~~~~~~~~~~~~~~ useage/ ~~~~~~~~~~~~~~~

import {useEffect, useState } from "react";
import ReactDOM from 'react-dom';

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window; // <-- I'm having trouble with 'window not being defined'
  return {
    width,
    height
  };
}

export default function UseWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}