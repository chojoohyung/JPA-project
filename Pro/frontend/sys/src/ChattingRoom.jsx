import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ChattingRoom = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const sendGetRequest = async (e) => {
     
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
    <div className='all-container'>
      <div className='List'>;
        <h1>SMART TALK</h1>
        <p>채팅방 리스트</p>
        <button >
    
            방 생성 </button>
        {data && (

<div className='ChattinRoomcontainer-'>
{data.map((room) => (
  <Link className='L' to={`/room/${room.id}`} key={room.id}>
    <div className='ChattingRoomList'>
      <div className="RoomContent">
        <img className="RoomImage" src="img/img.png" alt="img" />
        <div className="RoomText">
          <p>Title: {room.title || 'No Title'}</p>
          <p>인원 수: {room.num_of_people}</p>
        </div>
      </div>
    </div>
  </Link>
))}
</div>


        )}
      </div>
    </div>
  );
};

export default ChattingRoom;
