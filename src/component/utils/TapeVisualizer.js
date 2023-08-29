import React from 'react';
import { useEffect, useRef } from 'react';
import '../../css/TapeVisualizer.css';

function TapeVisualizer({ tape, pointer }) {
  const tapeArray = tape.split('');

  const tapeContainerRef = useRef(null);

  useEffect(() => {
    if (tapeContainerRef.current && pointer >= 0) {
      const cellElement = tapeContainerRef.current.children[pointer];
      if (cellElement) {
        cellElement.scrollIntoView({ block: 'center', inline: 'center' });
      }
    }
  }, [pointer]);

  return (
    <div className="tape-visualizer" ref={tapeContainerRef}>
      {tapeArray.map((cell, index) => (
        <div
          key={index}
          className={`tape-cell ${index === pointer ? 'cursor' : ''}`}
        >
          {cell}
        </div>
      ))}
    </div>
  );
}

export default TapeVisualizer;
