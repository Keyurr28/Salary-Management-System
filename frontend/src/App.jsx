import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './modules/auth/Login';
import DashboardHome from './modules/dashboard/pages/DashboardHome';
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {
  const isProd = import.meta.env.PROD;
  const basename = isProd ? '/Salary-Management-System/' : '/';

  return (
    <Router basename={basename}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login/Salary-Management-System" element={<Login />} />
        <Route path="/dashboard" element={<DashboardHome />} />
      </Routes>
    </Router>
  );
}

export default App;
