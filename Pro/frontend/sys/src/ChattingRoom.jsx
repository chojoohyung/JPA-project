import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ChattingRoom = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const sendGetRequest = async () => {
      try {
        const response = await fetch('http://localhost:8081/ChatRoomList');
        if (response.ok) {
          const responseData = await response.json();
          setData(responseData);

          console.log('Response from server:', responseData);
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

      {data && (
        <div>
          <h2>Data from Server:</h2>
          <ul>
            {data.map((room) => (
              <li key={room.id}>
                <p>Title: {room.title || 'No Title'}</p>
                <p>Number of People: {room.num_of_people}</p>
                
                {/* Link를 사용하여 해당 방의 ID를 URL에 포함시키고, '/room/:id'로 이동 */}
                <Link to={`/room/${room.id}`}>
                  <button>입장</button>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ChattingRoom;
