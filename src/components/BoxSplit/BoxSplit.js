import React, { useState } from "react";
import './BoxSplit.css'; 

const BoxSplit = () => {
  // Initial square size and boundary
  const initialSize = 500;
  const [squares, setSquares] = useState([
    { x: 0, y: 0, size: initialSize }
  ]);

  const handleSquareClick = (square) => {
    // Calculate the new size of the smaller squares (1/2 of current size)
    const newSize = square.size / 2;

    // Create 4 new squares that are divided from the clicked square
    const newSquares = [
      { x: square.x, y: square.y, size: newSize }, // top-left
      { x: square.x + newSize, y: square.y, size: newSize }, // top-right
      { x: square.x, y: square.y + newSize, size: newSize }, // bottom-left
      { x: square.x + newSize, y: square.y + newSize, size: newSize }, // bottom-right
    ];

    // Update state with the new squares and maintain the initial large square
    setSquares((prevSquares) => {
      // Remove the clicked square and add the new smaller ones
      const updatedSquares = prevSquares.filter(s => s !== square);
      return [...updatedSquares, ...newSquares];
    });
  };

  const renderSquares = () => {
    return squares.map((square, index) => (
      <div
        key={index}
        onClick={() => handleSquareClick(square)}
        className="square"
        style={{
          left: `${square.x}px`,
          top: `${square.y}px`,
          width: `${square.size}px`,
          height: `${square.size}px`,
        }}
      />
    ));
  };

  return (
    <div className="box-container box-split">
      {renderSquares()}
    </div>
  );
};

export default BoxSplit;
