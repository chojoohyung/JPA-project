import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ChattingRoom = () => {
  const [data, setData] = useState([]);
  const [newChatRoomTitle, setNewChatRoomTitle] = useState('');

  const sendGetRequest = async () => {
    
    try {
      const response = await fetch('http://localhost:8081/ChatRoomList');
      if (response.ok) {
        const responseData = await response.json();
        setData(responseData);
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    sendGetRequest();
  }, []);

  const createChatRoom = async () => {
    try {
      const formData = new URLSearchParams();
      formData.append('title', newChatRoomTitle);
      formData.append('num_of_people', 10);
  
      const response = await fetch('http://localhost:8081/createChatRoom', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
      });
  
      if (response.ok) {
        console.log('채팅방 생성 성공');
        sendGetRequest();
      } else {
        console.error('채팅방 생성 실패:', response);
      }
    } catch (error) {
      console.error('채팅방 생성 중 오류:', error);
    }
  };
  //방 삭제 코드
  /**const deleteChatRoom = async (roomId) => {
    try {
      const response = await fetch(`http://localhost:8081/deleteChatRoom/${roomId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('채팅방 삭제 성공');
        sendGetRequest();
      } else {
        console.error('채팅방 삭제 실패:', response);
      }
    } catch (error) {
      console.error('채팅방 삭제 중 오류:', error);
    }

    <button onClick={deleteChatRoom}>방 삭제 </button>
  };**/
  

  return (
    <div className='all-container'>
      <div className='List'>
        <h1>SMART TALK</h1>
        <p>채팅방 리스트</p>
        <button onClick={createChatRoom}>방 생성 </button>
        

        <input
          type="text"
          value={newChatRoomTitle}
          onChange={(e) => setNewChatRoomTitle(e.target.value)}
          placeholder="Enter room title"
        />
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
