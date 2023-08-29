import React from 'react';
import '../../css/TapeVisualizer.css';

function TapeVisualizer({ tape, pointer }) {
  const tapeArray = tape.split('');

  return (
    <div className="tape-visualizer">
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