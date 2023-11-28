// App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import ChattingRoom from './ChattingRoom';

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);

  return (
    <Router>
      <Routes>
        {isLoggedIn ? (
          <Route path="/" element={<ChattingRoom />} />
        ) : (
          <Route path="/" element={<Login setLoggedIn={setLoggedIn} />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
