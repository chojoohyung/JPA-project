import React, { useEffect } from 'react';

const ChattingRoom = () => {
  useEffect(() => {
    const sendGetRequest = async () => {
      try {
        const response = await fetch('http://localhost:8080');
        if (response.ok) {
          const data = await response.json();
          console.log('Response from server:', data);
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    sendGetRequest();
  }, []);

  return (
    <div>
      <h1>Chatting Room</h1>
      <p>Welcome to the Chatting Room!</p>
    
    </div>
  );
};

export default ChattingRoom;