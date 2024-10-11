import React, { useState, useEffect } from 'react';
import "./quiz.css";
import quizData from "../../utils/analyticalQuiz.js"; // Import analytical quiz data
import { useNavigate } from 'react-router-dom';

export default function AnalyticalQuiz() {
  const [showInstructions, setShowInstructions] = useState(true);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(600); // 600 seconds = 10 minutes
  const nav = useNavigate();

  // Timer logic
  useEffect(() => {
    if (quizStarted && timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);

      return () => clearInterval(timerId);
    } else if (timeLeft === 0) {
      alert("Time's up! Submitting quiz.");
      handleSubmit();
    }
  }, [timeLeft, quizStarted]);

  // Function to handle answer selection
  const handleAnswer = (questionIndex, selectedOption) => {
    setUserAnswers(prevAnswers => ({ ...prevAnswers, [questionIndex]: selectedOption }));
  };

  // Function to calculate score
  const calculateScore = () => {
    let calculatedScore = 0;
    quizData.forEach((question, index) => {
      if (userAnswers[index] === question.answer) {
        calculatedScore += 1;
      }
    });
    setScore(calculatedScore);
  };

  // Function to submit the quiz
  const handleSubmit = () => {
    calculateScore();
    setQuizStarted(false);
    setQuizCompleted(true);
  };

  // Function to start the quiz
  const startQuiz = () => {
    setShowInstructions(false);
    setQuizStarted(true);
    setQuizCompleted(false);
    setTimeLeft(600);
    setUserAnswers({});
    setScore(0);
  };

  return (
    <div className="quiz-container">
      {showInstructions && (
        <div className="instructions-dialog">
          <h2>Instructions</h2>
          <p>This quiz consists of multiple-choice questions. You will have 10 minutes to complete the quiz.</p>
          <p>Once the time runs out, the quiz will be automatically submitted.</p>
          <button className="btn btn-primary" onClick={startQuiz}>
            Start Quiz
          </button>
        </div>
      )}

      {quizStarted && (
        <>
          <div className="timer">
            <p>Time Remaining: {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? '0' : ''}{timeLeft % 60} minutes</p>
          </div>

          <div className="question-section">
            <h3>Question {currentQuestion + 1} of {quizData.length}</h3>
            <p>{quizData[currentQuestion]?.Question || "Loading..."}</p>

            <div className="options-section">
              {[1, 2, 3, 4].map(option => (
                <label key={option}>
                  <input
                    type="radio"
                    name={`question${currentQuestion}`}
                    value={option}
                    checked={userAnswers[currentQuestion] === option} // Set the checked state
                    onChange={() => handleAnswer(currentQuestion, option)} // Use onChange to capture user selection
                  /> {quizData[currentQuestion]?.[`option${option}`] || `Option ${option}`}
                </label>
              ))}
            </div>

            <div className="navigation-buttons">
              {currentQuestion > 0 && (
                <button
                  className="btn btn-secondary"
                  onClick={() => setCurrentQuestion(currentQuestion - 1)}
                >
                  Previous
                </button>
              )}
              {currentQuestion < quizData.length - 1 && (
                <button
                  className="btn btn-primary"
                  onClick={() => setCurrentQuestion(currentQuestion + 1)}
                >
                  Next
                </button>
              )}
              {currentQuestion === quizData.length - 1 && (
                <button className="btn btn-success" onClick={handleSubmit}>
                  Submit Quiz
                </button>
              )}
            </div>
          </div>
        </>
      )}

      {quizCompleted && (
        <div className="results-section">
          <h2>Quiz Completed</h2>
          <p>Your score is: {score} out of {quizData.length}</p>
          <button className="btn btn-primary" onClick={() => window.location.reload()}>
            Retake Quiz
          </button>
          <button className="btn btn-primary" onClick={() => nav("/dashboard")}>
            Go to Dashboard
          </button>
        </div>
      )}
    </div>
  );
}
