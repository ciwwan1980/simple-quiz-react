import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Quiz!</h1>
      <Link to="/quiz/10/18/medium/multiple">Start Quiz</Link>
    </div>
  );
};

export default Home;

