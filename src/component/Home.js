import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const history = useHistory();

  const startQuiz = () => {
    history.push('./quiz/10/18/medium/multiple');
  };

  return (
    <div className="homeContainer">
      <h1>Welcome to the Quiz!</h1>
      <button onClick={startQuiz} className="startQuizLink">
        Start Quiz
      </button>
    </div>
  );
};

export default Home;
