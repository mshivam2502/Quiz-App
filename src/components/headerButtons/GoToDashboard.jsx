import React from 'react';
import './headerButtons.css'; // Reusing the same CSS file

export default function GoToDashboard() {

  function handleDashboardClick() {
        window.location.href = '/dashboard';  // Redirect to dashboard page
  };

  return (
    <button className="dashboard-button" onClick={handleDashboardClick}>
      Go to Dashboard
    </button>
  );
};