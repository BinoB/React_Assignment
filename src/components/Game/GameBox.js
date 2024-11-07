import React, { useEffect, useState } from "react";
import "./GameBox.css";

const GameBox = () => {
  const [keywordBox, setKeywordBox] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isPlaying, setIsPlaying] = useState(false); // To track if the game is active
  const [clickedBox, setClickedBox] = useState(null);
  const [isCorrectClick, setIsCorrectClick] = useState(false);

  // Handle game timer
  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isPlaying, timeLeft]);

  // Handle keyword appearance
  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      const showKeyword = setInterval(() => {
        const randomBox = Math.floor(Math.random() * 9);
        setKeywordBox(randomBox);

        setTimeout(() => {
          setKeywordBox(null);
        }, 1000);
      }, 1000);

      return () => clearInterval(showKeyword);
    }
  }, [isPlaying, timeLeft]);

  // Handle box click
  const handleBoxClick = (index) => {
    if (!isPlaying) return; // Ignore clicks if the game hasn't started

    if (index === keywordBox) {
      setScore((prevScore) => prevScore + 5);
      setIsCorrectClick(true); // Correct click
    } else {
      setScore((prevScore) => prevScore - 2.5);
      setIsCorrectClick(false); // Incorrect click
    }
    setClickedBox(index); // Set clicked box for color feedback

    // Clear the feedback after 0.5 sec
    setTimeout(() => {
      setClickedBox(null);
    }, 500);
  };

  // Start the game
  const handleStart = () => {
    setIsPlaying(true);
    setScore(0);
    setTimeLeft(60);
  };

  // Reset the game
  const handleReset = () => {
    setIsPlaying(false);
    setScore(0);
    setTimeLeft(60);
    setKeywordBox(null);
    setClickedBox(null);
  };

  return (
    <div className="game-container">
      <h2>Game Box</h2>
      <div className="control">
        <div>
          <button className="button-game" onClick={handleStart}>
            Start
          </button>
        </div>
        <div>
          <button className="button-game" onClick={handleReset}>
            Reset
          </button>
        </div>
      </div>
      <p>Score: {score}</p>
      <p>Time Left: {timeLeft}s</p>
      <div className="grid">
        {[...Array(9)].map((_, index) => (
          <div
            key={index}
            className={`box ${
              clickedBox === index
                ? isCorrectClick
                  ? "correct"
                  : "incorrect"
                : ""
            }`}
            onClick={() => handleBoxClick(index)}
          >
            {keywordBox === index ? "HIT" : ""}
          </div>
        ))}
      </div>
      <div className="score">
      {timeLeft === 0 && <p>Game Over! Final Score: {score}</p>}
      </div>
    </div>
  );
};

export default GameBox;
