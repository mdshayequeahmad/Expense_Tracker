import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Home from './pages/Home';
import Profile from './pages/Profile';
import ForgotPassword from './pages/ForgotPassword';
import { useSelector } from 'react-redux';
import ExpenseUpdate from './components/ExpenseUpdate';

const App = () => {

  const user = useSelector((state) => state.expenses.userInfo);

  const PrivateRoute = ({ children }) => {
    const isLoggedIn = user;
    return isLoggedIn ? children : <Navigate to="/signin" />;
  };

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/update/:id" element={<ExpenseUpdate />} />
      </Routes>
    </div>
  )
}

export default App;