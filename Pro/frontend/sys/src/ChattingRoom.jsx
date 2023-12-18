// ChattingRoom.jsx

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


const ChattingRoom = () => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [newChatRoomTitle, setNewChatRoomTitle] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');


  const sendGetRequest = async () => {
    try {
      const response = await fetch('http://localhost:8081/ChatRoomList');
      if (response.ok) {
        console.error('데이터 가져오기 성공');
        const responseData = await response.json();
        setData(responseData);
      } else {
        console.error('데이터 가져오기 실패');
      }
    } catch (error) {
      console.error('데이터 가져오기 오류:', error);
    }
  };

  useEffect(() => {
    sendGetRequest();
    
  }, []);

  const createChatRoom = async () => {
    try {
      const formData = new URLSearchParams();
      formData.append('title', newChatRoomTitle);
      formData.append('num_of_people', '0');

      const response = await fetch('http://localhost:8081/createChatRoom', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
      });
      if (response.ok) {
        console.log('채팅방 생성 성공');
        const responseData = await response.json(); // 서버에서 반환된 JSON 파싱
        console.log('채팅방 생성 성공. 생성된 방의 ID:', responseData);
        navigate(`/room/${responseData}`);
        sendGetRequest();
      } else {
        console.error('채팅방 생성 실패:', response);
      }
    } catch (error) {
      console.error('채팅방 생성 중 오류:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  const handleLoginRedirect = () => {
    window.location.href = '/'
  };

  // ... (이전 코드는 여기에 있음)

  const handleDeleteRoom = async (roomId) => {
    try {
      const response = await fetch(`http://localhost:8081/deleteChatRoom/${roomId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        console.log('채팅방 삭제 성공');
        // 성공적으로 삭제되면 UI에서 해당 방을 제거
        setData((prevData) => prevData.filter((room) => room.id !== roomId));
      } else {
        console.error('채팅방 삭제 실패:', response);
      }
    } catch (error) {
      console.error('채팅방 삭제 중 오류:', error);
    }
  };

  // ... (이후 코드는 여기에 있음)


  return (
    <div className='all-container'>
      <div className='List'>
        <h1>SMART TALK</h1>
        <p>채팅방 리스트</p>
        {isLoggedIn ? (
          <>
            <button onClick={handleLogout}>로그아웃</button>
            <button onClick={sendGetRequest}>방 새로고침</button>
            <button onClick={createChatRoom}>방 생성</button>
            <input
              type="text"
              value={newChatRoomTitle}
              onChange={(e) => setNewChatRoomTitle(e.target.value)}
              placeholder="방 제목을 입력하세요"
            />
            {data && (
              <div className='ChattingRoomcontainer'>
                <div className='ChattingRoomList'>
                  {data.slice().reverse().map((room) => (
                    <Link className='L' to={`/room/${room.id}`}>
                      <div key={room.id} className='RoomContent'>
                        <img className='RoomImage' src='img/img.png' alt='img' />
                        <div className='RoomText'>
                          <p>Title: {room.title || 'No Title'}</p>
                          <p>인원 수: {room.num_of_people}</p>
                          {room.num_of_people === 0 && (
                            <button onClick={() => handleDeleteRoom(room.id)}>삭제</button>
                          )}
                        </div>


                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            <p>로그인이 필요합니다. 로그인 페이지로 이동합니다.</p>
            <button onClick={handleLoginRedirect}>로그인 페이지로 이동</button>
          </>
        )}
      </div>
    </div>
  );
};

export default ChattingRoom;
