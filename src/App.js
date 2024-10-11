import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Heading from "./components/Heading";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import GkQuiz from "./components/quizComponent/GkQuiz";
import AnalyticalQuiz from "./components/quizComponent/AnalyticalQuiz";
import CodingQuiz from "./components/quizComponent/CodingQuiz";
import Logout from "./components/headerButtons/Logout";
import GoToDashboard from "./components/headerButtons/GoToDashboard";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/dashboard",
      element: (
        <PrivateRoute>
          <Dashboard />
          <Logout />
        </PrivateRoute>
      ),
    },
    {
      path: "/dashboard/gk-quiz",
      element: (
        <PrivateRoute>
          <GkQuiz />
          <GoToDashboard />
          <Logout />
        </PrivateRoute>
      ),
    },
    {
      path: "/dashboard/analytical-quiz",
      element: (
        <PrivateRoute>
          <AnalyticalQuiz />
          <GoToDashboard />
          <Logout />
        </PrivateRoute>
      ),
    },
    {
      path: "/dashboard/coding-quiz",
      element: (
        <PrivateRoute>
          <CodingQuiz />
          <GoToDashboard />
          <Logout />
        </PrivateRoute>
      ),
    },
  ]);

  return (
    <div className="App">
      <Heading />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
