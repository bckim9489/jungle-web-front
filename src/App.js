import React, { useState, useEffect } from 'react';
import { Route, Routes} from 'react-router-dom';
import BoardList from "./routes/BoardList";
import Home from "./routes/Home";
import BoardDetail from "./routes/BoardDetail";
import BoardWrite from './routes/BoardWrite';
import BoardUpdate from "./routes/BoardUpdate";
import LoginPage from "./routes/login";
import ProtectedRoute from './components/ProtectedRoute';
import Header from './layout/Header';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('uid');
    localStorage.removeItem('userNm');
    localStorage.removeItem('userId');
    setIsAuthenticated(false);
  };

  return (
    <>
    <Header isAuthenticated={isAuthenticated} logout={logout} />
    <Routes>
      <Route path="/" element={<LoginPage authenticate={() => setIsAuthenticated(true)} isAuthenticated={isAuthenticated} />} />
      <Route path="/home" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Home /></ProtectedRoute>} />
      <Route path="/board" element={<ProtectedRoute isAuthenticated={isAuthenticated}><BoardList /></ProtectedRoute>} />
      <Route path="/board/:bid" element={<ProtectedRoute isAuthenticated={isAuthenticated}><BoardDetail /></ProtectedRoute>} />
      <Route path="/write" element={<ProtectedRoute isAuthenticated={isAuthenticated}><BoardWrite /></ProtectedRoute>} />
      <Route path="/update/:bid" element={<ProtectedRoute isAuthenticated={isAuthenticated}><BoardUpdate /></ProtectedRoute>} />
    </Routes>
    </>
  );
}

export default App;