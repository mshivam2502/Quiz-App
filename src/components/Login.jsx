import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './components.css';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    // Login function to validate user credentials
    function handleLogin(e) {
        e.preventDefault();

        // Retrieve users from localStorage
        const users = JSON.parse(localStorage.getItem('users')) || [];
        
        // Check if user exists with matching password
        const user = users.find(u => u.username === username && u.password === password);

        if (user) {
            
            //save loggedin user
            localStorage.setItem('loggedInUser', username);

            // Successful login - Navigate to the desired page (e.g., dashboard)
            setError('');
            alert("Login successful!");
            navigate("/dashboard"); // Assuming /dashboard is a protected route
        } else {
            // Failed login
            setError('Invalid username or password');
        }
    }

    // Redirect to Register Page
    function handleRegister() {
        navigate("/register");
    }

    return (
        <div className="d-flex justify-content-center">
            <form onSubmit={handleLogin} className="login-form">

                {/* Error Message */}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                
                <div className="mb-2">
                    <label htmlFor="username">Username:</label>
                    <br />
                    <input 
                        type="text" 
                        id="username" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} 
                        required 
                    />
                </div>

                <div>
                    <label htmlFor="password">Password:</label>
                    <br />
                    <input 
                        type="password" 
                        id="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>

                <div>
                    <button type="submit" className="btn btn-primary m-1">Login</button>
                    <button type="button" className="btn btn-light m-1" onClick={handleRegister}>Register</button>
                </div>
            </form>
        </div>
    );
}
