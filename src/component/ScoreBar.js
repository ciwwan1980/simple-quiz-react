import React from 'react';

const ScoreBar = ({ score, totalQuestions }) => {
  const percentage = Math.floor((score / totalQuestions) * 100);

  return (
    <div>
      <h3>Score: {score}</h3>
      <div className="score-bar">
        <div className="score-fill" style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  );
};

export default ScoreBar;
