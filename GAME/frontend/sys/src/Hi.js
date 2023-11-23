// App.js 버튼 넘어가는 동작
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Outlet } from 'react-router-dom';
import Main from './Main';
import './App.css';

function Hi() {
  return (
    <Router>
      <div>
      
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <Link to="/main">
                  <button>이동</button>
                </Link>
                <Outlet />
              </div>
            }
          />
          <Route path="/main" element={<Main />} />
        </Routes>
      </div>
    </Router>
  );
}

export default Hi;
