import React from 'react';
import { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CustomLayout from './components/layout/Layout.component';
import Loader from './components/loader/Loader.component';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import LandingPage from './pages/landingPage/LandingPage';
import ThreadDetail from './pages/threadDetail/ThreadDetail';
import Threads from './pages/threads/Threads';

function App() {
  const { isLoggedIn, isLoading: authLoading } = useSelector((state) => state.auth);
  const { isLoading } = useSelector((state) => state.threads);
  return (
    <>
      {(isLoading || authLoading) && <Loader /> }
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={isLoggedIn ? <Threads /> : <Register />} />
          <Route path="/login" element={isLoggedIn ? <Threads /> : <Login />} />
          <Route path="/threads" element={<CustomLayout><Threads /></CustomLayout>} />
          <Route path="/threads/:threadId" element={<ThreadDetail />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
