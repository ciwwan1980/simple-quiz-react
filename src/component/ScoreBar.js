import React from 'react';
import './ScoreBar.css';

const ScoreBar = ({ score, totalQuestions }) => {
  const percentage = Math.floor((score / totalQuestions) * 100);

  return (
    <div className="scoreBarContainer">
      <h3>Score: {score}</h3>
      <div className="scoreBar">
        <div className="scoreBarFill" style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  );
};

export default ScoreBar;
