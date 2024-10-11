import { Link } from 'react-router-dom';
import './dashboard.css';

export default function Dashboard() {
    return (
        <div className="dashboard-container">
            <h1>Choose Your Quiz</h1>
            <div className="quiz-options">
                <div className="quiz-card">
                    <Link to="/dashboard/gk-quiz" className="quiz-link">
                        <h3>GK Quiz</h3>
                        <p>Test your general knowledge</p>
                    </Link>
                </div>
                <div className="quiz-card">
                    <Link to="/dashboard/analytical-quiz" className="quiz-link">
                        <h3>Analytical Quiz</h3>
                        <p>Challenge your analytical skills</p>
                    </Link>
                </div>
                <div className="quiz-card">
                    <Link to="/dashboard/coding-quiz" className="quiz-link">
                        <h3>Coding MCQs</h3>
                        <p>Evaluate your coding knowledge</p>
                    </Link>
                </div>
            </div>
        </div>
    );
}
