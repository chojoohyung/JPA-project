// App.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Main from './Main';

function App() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/main');
  };

  return (
    <div>
      <button onClick={handleButtonClick}>이동</button>
    </div>
  );
}

export default App;
