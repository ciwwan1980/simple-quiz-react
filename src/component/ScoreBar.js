/* ScoreBar.js */
import React from 'react';
import './ScoreBar.css';

const ScoreBar = ({ correctScore, incorrectScore, totalQuestions }) => {
  const correctPercentage = Math.floor((correctScore / totalQuestions) * 100);
  const incorrectPercentage = Math.floor((incorrectScore / totalQuestions) * 100);

  return (
    <div className="scoreBarContainer">
      <h3>Correct Answers: {correctScore}</h3>
      <div className="scoreBar correctBar">
        <div className="scoreBarFill" style={{ width: `${correctPercentage}%` }}></div>
      </div>

      <h3>Incorrect Answers: {incorrectScore}</h3>
      <div className="scoreBar incorrectBar">
        <div className="scoreBarFill" style={{ width: `${incorrectPercentage}%` }}></div>
      </div>
    </div>
  );
};

export default ScoreBar;
