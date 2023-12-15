import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import SockJS from 'sockjs-client';
import Stomp from 'webstomp-client';

const RoomDetail = () => {

  const [exitRoom, setExitRoom] = useState(false);
  const navigate = useNavigate();
  const handleExitRoom = () => {
    setExitRoom(true);
    navigate(-1);
  };

  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [stompClient, setStompClient] = useState(null);

  useEffect(() => {
    // SockJS 연결 설정
    const socket = new SockJS('http://localhost:8081/ws'); // SockJS 서버 주소로 변경하세요
    const stomp = Stomp.over(socket);
    setStompClient(stomp);

    stomp.connect({}, () => {
      // 연결 성공 시 실행
      console.log('Connected to SockJS');
      stomp.subscribe('/topic/messages/1', (message) => {
        // 새로운 메시지 도착 시 실행
        const newMessage = JSON.parse(message.body);
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });
    });

    // 컴포넌트 언마운트 시 SockJS 연결 해제
    return () => {
      if (stomp.connected) {
        stomp.disconnect();
      }
    };
  }, []);

  const sendMessage = () => {
    if (stompClient && inputMessage.trim() !== '') {
      const message = { content: inputMessage };

      // 메시지 전송
      stompClient.send(
        '/app/sendMessage/' + '1' + '/' + inputMessage,
        {}, // 헤더 설정 없이 전송

      );
      console.log(JSON.stringify(message));
      setInputMessage('');
    }
  };


  return (
    <div>
      <div>
        <h2>Chat Room</h2>
        <div style={{ maxHeight: '300px', overflowY: 'auto', border: '1px solid #ccc', padding: '10px' }}>
          {messages.map((msg, index) => (
            <div key={index}>
            <p>Content: {msg.content}</p>
            {msg.username && <p>Username: {msg.username}</p>}
            {msg.createDate && <p>Create Date: {new Date(msg.createDate).toLocaleString()}</p>}
          </div>
          ))}
        </div>
      </div>
      <div>
        <input
          type="text"
          placeholder="Type your message..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>


      {exitRoom ? (
        <p>out</p>
      ) : (
        <button onClick={handleExitRoom}>방 나가기</button>
      )}
    </div>
  );
};

export default RoomDetail;