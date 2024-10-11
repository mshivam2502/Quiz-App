import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const nav = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if passwords match
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            setSuccess('');
            return;
        }

        // Check if user already exists in localStorage
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userExists = users.some(user => user.username === username);

        if (userExists) {
            setError('Username already exists');
            setSuccess('');
        } else {
            // Save user to localStorage
            const newUser = { username, password };
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));

            setError('');
            setSuccess('Registration successful!');
            setUsername('');
            setPassword('');
            setConfirmPassword('');
        }
    };

    return (
        <div className="d-flex justify-content-center">
            <form onSubmit={handleSubmit} className="login-form">
                
                {/* Error Message */}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                
                {/* Success Message */}
                {success && <p style={{ color: 'green' }}>{success}</p>}
                
                <div className="mb-2">
                    <label htmlFor="username">Username: </label>
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
                    <label htmlFor="password">Password: </label>
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
                    <label htmlFor="confirm-password">Confirm Password: </label>
                    <br />
                    <input 
                        type="password" 
                        id="confirm-password" 
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                        required 
                    />
                </div>

                <div>
                    <button type="submit" className="btn btn-primary m-1" value={(success)?true:false}>{(success)?"Login":"Register"}</button>
            <button className="btn btn-light m-1" onClick={()=>{nav("/")}}>Back to login</button>
                </div>
            </form>
        </div>
    );
}
