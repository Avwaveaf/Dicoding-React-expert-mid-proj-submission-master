import { Axios } from 'axios';
import React from 'react';
import { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ThreadDetail from './pages/threadDetail/ThreadDetail';
import Threads from './pages/threads/Threads';

function App() {
  const { isLoggedIn } = useSelector((state) => state.auth);
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Threads />} />
          <Route path="/register" element={isLoggedIn ? <Threads /> : <Register />} />
          <Route path="/login" element={isLoggedIn ? <Threads /> : <Login />} />
          <Route path="/threads" element={<Threads />} />
          <Route path="/threads/:threadId" element={<ThreadDetail />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
