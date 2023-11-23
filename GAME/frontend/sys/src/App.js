// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Outlet } from 'react-router-dom';
import Main from 'main';

// Main 컴포넌트를 받아서 랜덤한 ID를 부여하는 함수
function generateMainRoute(MainComponent, id) {
  return (
    <Route key={id} path={`/main/${id}`} element={<MainComponent />} />
  );
}

function Hi() {
  return (
    <Router>
      <div>
        <Routes>
          <Route
            path="/"
            element={
              <div>
                {/* 메인 루트를 동적으로 생성하여 렌더링 */}
                {[1, 2].map((id) => generateMainRoute(Main, id))}
                <Outlet />
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default Hi;

