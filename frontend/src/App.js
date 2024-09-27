import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Welcome from './components/Welcome';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import CreateEmployee from './components/CreateEmployee';
import EmployeeList from './components/EmployeeList';
import EmployeeEdit from './components/EmployeeEdit';
import Header from './components/Header';
import Footer from './components/Footer';
// import './App.css';

// A higher-order component to protect routes
const PrivateRoute = ({ element: Component, ...rest }) => {
  const isAuthenticated = localStorage.getItem('authToken'); // Check for authentication token
  return isAuthenticated ? <Component {...rest} /> : <Navigate to="/login" />;
};

function App() {
  const [fullName, setFullName] = useState('');

  // Using useLocation inside the Router
  const location = useLocation();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.fullName) {
      setFullName(user.fullName); // Set full name if available
    }
  }, []);

  return (
    <div className="App">
      {/* Show Header only if the user is authenticated and not on the login or register page */}
      {localStorage.getItem('authToken') && location.pathname !== '/login' && location.pathname !== '/register' && (
        <Header fullName={fullName} />
      )}

      <main>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login setFullName={setFullName} />} />
          <Route path="/register" element={<Register />} />

          {/* Private routes */}
          <Route path="/dashboard" element={<PrivateRoute element={Dashboard} />} />
          <Route path="/create-employee" element={<PrivateRoute element={CreateEmployee} />} />
          <Route path="/employee-list" element={<PrivateRoute element={EmployeeList} />} />
          <Route path="/employee-edit/:id" element={<PrivateRoute element={EmployeeEdit} />} />

          {/* Default route */}
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </main>

      {/* Show Footer only if user is authenticated and not on login or register page */}
      {localStorage.getItem('authToken') && location.pathname !== '/login' && location.pathname !== '/register' && <Footer />}
    </div>
  );
}

function RootApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default RootApp;
