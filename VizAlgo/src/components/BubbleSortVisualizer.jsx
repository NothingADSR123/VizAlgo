import React, { useState, useRef } from "react";
import anime from "animejs";

export default function BubbleSortVisualizer() {
  const [array, setArray] = useState([]);
  const [size, setSize] = useState(10);
  const [sorting, setSorting] = useState(false);
  const [speed, setSpeed] = useState(50);
  const sortingTimeouts = useRef([]);
  const animations = useRef([]);
  const isReset = useRef(false);

  const generateArray = () => {
    if (sorting) return;
    const newArray = Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 1);
    setArray(newArray);
  };

  const cleanupAnimations = () => {
    sortingTimeouts.current.forEach((timeout) => clearTimeout(timeout));
    sortingTimeouts.current = [];
    animations.current.forEach((anim) => anim.pause());
    animations.current = [];
    const elements = document.querySelectorAll(".bar");
    elements.forEach((el) => {
      el.style.backgroundColor = "#41B3A2"; // Reset color to default
      el.style.transform = "";
    });
  };

  const delay = (duration) =>
    new Promise((resolve) => {
      const timeout = setTimeout(resolve, duration);
      sortingTimeouts.current.push(timeout);
    });

  const animateSwap = async (bar1, bar2) => {
    const translateX = bar2.offsetLeft - bar1.offsetLeft;

    return new Promise((resolve) => {
      const animation = anime({
        targets: [bar1, bar2],
        translateX: (el, i) => (i === 0 ? translateX : -translateX),
        duration: speed,
        easing: "easeInOutQuad",
        complete: () => {
          bar1.style.transform = "";
          bar2.style.transform = "";
          resolve();
        },
      });
      animations.current.push(animation);
    });
  };

  const visualizeBubbleSort = async () => {
    if (array.length === 0) return;

    setSorting(true);
    isReset.current = false;

    const arr = [...array];
    const elements = document.querySelectorAll(".bar");

    try {
      for (let i = 0; i < arr.length - 1; i++) {
        let swapped = false;

        for (let j = 0; j < arr.length - i - 1; j++) {
          if (isReset.current) return;

          // Mark bars for comparison
          elements[j].style.backgroundColor = "#D7C3F1"; // Light Purple
          elements[j + 1].style.backgroundColor = "#D7C3F1"; // Light Purple

          await delay(speed);

          if (arr[j] > arr[j + 1]) {
            // Perform swap
            [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            setArray([...arr]);
            await animateSwap(elements[j], elements[j + 1]);
            swapped = true;
          }

          // Reset colors after comparison
          elements[j].style.backgroundColor = "#41B3A2"; // Default color
          elements[j + 1].style.backgroundColor = "#41B3A2"; // Default color
        }

        // If no swaps were made, break early
        if (!swapped) break;
      }

      // After sorting, color the bars green
      const sortedElements = document.querySelectorAll(".bar");
      sortedElements.forEach((el) => {
        el.style.backgroundColor = "#32CD32"; // Green for sorted bars
      });
    } finally {
      setSorting(false);
    }
  };

  const handleReset = () => {
    isReset.current = true;
    cleanupAnimations();
    setSorting(false);
    generateArray();
  };

  const handleSpeedChange = (e) => {
    setSpeed(Number(e.target.value));
  };

  // Generate initial array
  React.useEffect(() => {
    generateArray();
    return () => cleanupAnimations();
  }, []);

  return (
    <div className="w-full bg-[#D7C3F1] p-4 flex flex-col items-center justify-center">
      <div className="flex items-center space-x-2 mt-4 mb-2">
        <label htmlFor="size" className="font-medium text-sm">Array Size:</label>
        <input
          id="size"
          type="number"
          value={size}
          onChange={(e) => setSize(Number(e.target.value))}
          min="2"
          max="50"
          className="w-12 p-1 text-sm rounded border-2 border-[#0D7C66]"
          disabled={sorting}
        />
        <button
          onClick={generateArray}
          className="px-3 py-1 bg-[#0D7C66] text-white text-sm rounded hover:bg-[#41B3A2] transition"
          disabled={sorting}
        >
          Generate
        </button>
      </div>

      <div className="flex justify-center items-end space-x-1 w-full h-40 mb-2">
        {array.map((value, index) => (
          <div
            key={index}
            className="bar w-6 bg-[#41B3A2] rounded-t"
            style={{ height: `${value * 1.5}px` }}
          ></div>
        ))}
      </div>

      <div className="flex items-center space-x-2 mb-2">
        <label htmlFor="speed" className="font-medium text-sm">Speed:</label>
        <input
          id="speed"
          type="range"
          min="50"
          max="1000"
          value={speed}
          onChange={handleSpeedChange}
          className="w-24"
          disabled={sorting}
        />
        <span className="text-sm">{speed} ms</span>
      </div>

      <div className="flex space-x-3">
        <button
          onClick={visualizeBubbleSort}
          className="px-3 py-1 bg-[#0D7C66] text-white text-sm rounded hover:bg-[#41B3A2] transition"
          disabled={sorting}
        >
          {sorting ? "Sorting..." : "Start Sort"}
        </button>
        <button
          onClick={handleReset}
          className="px-3 py-1 bg-[#BDE8CA] text-[#0D7C66] text-sm rounded hover:bg-[#41B3A2] transition"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
