import { useState, useEffect } from "react";
import "./App.css";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

function App() {
  const txt = [
    "One", "Two", "Three", "Four", "Five", "Six",
    "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve",
    "_One", "_Two", "_Three", "_Four", "_Five", "_Six",
    "_Seven", "_Eight", "_Nine", "_Ten", "_Eleven", "_Twelve"
  ];
  
  const [dataSlider, setDataSlider] = useState(txt);
  const [count, setCount] = useState(0);
  const itemsPerPage = 6;

  const shiftNext = () => {
    if (count < dataSlider.length - itemsPerPage) {
      setCount(count + 1);
    } else {
      setDataSlider([...dataSlider, ...dataSlider]);
    }
  };

  const shiftPrev = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev < dataSlider.length - itemsPerPage) {
          return prev + 1;
        } else {
          setDataSlider([...dataSlider, ...dataSlider]);
          return prev;
        }
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [dataSlider]);

  const sliderStyle = css`
    transform: translateX(calc(-${count} * (100% / ${itemsPerPage})));
    transition: transform 1s ease-in-out;
  `;

  return (
    <div className="slider_container">
      <div className="btns_control">
        <button onClick={shiftPrev}>Prev</button>
        <button onClick={shiftNext}>Next</button>
      </div>
      <div className="wraper">
        <div className="slider" css={sliderStyle}>
          {dataSlider.map((i, idx) => (
            <div className="card" key={idx}>
              <h3>{i}</h3>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
              <div className="btns">
                <button>Add</button>
                <button>Remove</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="pagination">
        {[...Array(txt.length - itemsPerPage + 1)].map((_, i) => (
          <span
            key={i}
            className={i === count ? "active" : ""}
            onClick={() => setCount(i)}
          ></span>
        ))}
      </div>
    </div>
  );
}

export default App;
