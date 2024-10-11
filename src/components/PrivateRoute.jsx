import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children }) {
    const loggedInUser = localStorage.getItem('loggedInUser');

    return loggedInUser ? children : <Navigate to="/" />;
}
