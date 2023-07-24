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
  const [answerSelected, setAnswerSelected] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const { amount, category, difficulty, type } = useParams();
  const history = useHistory();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`https://opentdb.com/api.php`, {
          params: { amount, category, difficulty, type },
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

    setAnswerSelected(true);
    setSelectedAnswer(answer);

    // Set a timeout to reset the selected answer after a brief delay
    setTimeout(() => {
      setAnswerSelected(false);
      setSelectedAnswer(null);
    }, 1000);
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
      <div className="quizFinishedContainer">
        <h2>Quiz Finished!</h2>
        <p>Your Score: {score}</p>
        <button onClick={restartQuiz} className="restartBtn">
          Start Again
        </button>
      </div>
    );
  }

  const currentQuestionObj = questions[currentQuestion];
  const answers = [...currentQuestionObj.incorrect_answers, currentQuestionObj.correct_answer];
  const shuffledAnswers = shuffleArray(answers);

  return (
    <div className="quizContainer">
      <h2>Question {currentQuestion + 1}</h2>
      <div className="question" dangerouslySetInnerHTML={{ __html: currentQuestionObj.question }} />
      <ul className="answerList">
        {shuffledAnswers.map((answer, index) => (
          <li key={index} className="answer">
            <button
              onClick={() => handleAnswer(answer)}
              className={`answerBtn ${answerSelected && answer === selectedAnswer ? (answer === currentQuestionObj.correct_answer ? 'correct' : 'incorrect') : ''}`}
              disabled={answerSelected}
            >
              {answer}
            </button>
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
