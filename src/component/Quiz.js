import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import ScoreBar from './ScoreBar';
import './Quiz.css';

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const { amount, category, difficulty, type } = useParams();
  const history = useHistory();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`https://opentdb.com/api.php`, {
          params: { amount, category, difficulty, type }
        });
        setQuestions(response.data.results);
      } catch (error) {
        console.log(error);
      }
    };

    fetchQuestions();
  }, [amount, category, difficulty, type]);

  const handleAnswer = (answer) => {
    const currentQuestionObj = questions[currentQuestion];

    if (answer === currentQuestionObj.correct_answer) {
      setScore(score + 1);
    }

    setCurrentQuestion(currentQuestion + 1);
    if (currentQuestion === questions.length - 1) {
      setQuizFinished(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setQuizFinished(false);
  };

  if (questions.length === 0) {
    return <div>Loading...</div>;
  }

  if (quizFinished) {
    return (
      <div>
        <h2>Quiz Finished!</h2>
        <p>Your Score: {score}</p>
        <button onClick={restartQuiz}>Start Again</button>
      </div>
    );
  }

  const currentQuestionObj = questions[currentQuestion];
  const answers = [...currentQuestionObj.incorrect_answers, currentQuestionObj.correct_answer];
  const shuffledAnswers = shuffleArray(answers);

  return (
    <div>
      <h2>Question {currentQuestion + 1}</h2>
      <div dangerouslySetInnerHTML={{ __html: currentQuestionObj.question }} />
      <ul>
        {shuffledAnswers.map((answer, index) => (
          <li key={index}>
            <button onClick={() => handleAnswer(answer)}>{answer}</button>
          </li>
        ))}
      </ul>
      <ScoreBar score={score} totalQuestions={questions.length} />
    </div>
  );
};

function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default Quiz;
