import React from 'react';
import './headerButtons.css'; // Separate CSS file for styling

export default function Logout() {
    
    function handleLogout() {
        localStorage.removeItem('loggedInUser');
        window.location.href = '/';  // Redirect to login page
    }

  return (
    <button className="logout-button" onClick={handleLogout}>
      Logout
    </button>
  );
};

