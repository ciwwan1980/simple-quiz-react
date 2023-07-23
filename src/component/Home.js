import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="homeContainer">
      <h1>Welcome to the Quiz!</h1>
      <Link to="/quiz/10/18/medium/multiple" className="startQuizLink">
        Start Quiz
      </Link>
    </div>
  );
};

export default Home;
