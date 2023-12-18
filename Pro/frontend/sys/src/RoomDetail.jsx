// RoomDetail.js

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SockJS from 'sockjs-client';
import Stomp from 'webstomp-client';
import './RoomDetail.css';

const RoomDetail = () => {
  const [exitRoom, setExitRoom] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const roomId = location.pathname.split('/').pop();

  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [stompClient, setStompClient] = useState(null);
  const contentRef = useRef();

  const username = localStorage.getItem('username');

  const socket = new SockJS(`http://localhost:8081/ws`);
  const stomp = Stomp.over(socket);



  useEffect(() => {

    if (!username) {
      navigate('/');
      return null;
    }

    setStompClient(stomp);
    const handleNewMessage = (message) => {
      const newMessage = JSON.parse(message.body);

      // 중복 메시지 체크
      if (!messages.some((msg) => msg.content === newMessage.content)) {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }
    };

    stomp.connect({}, () => {
      console.log('Connected to SockJS');

      // 중복 Subscription 방지
      if (!stomp.subscriptions[`/topic/messages/${roomId}`]) {
        stomp.subscribe(`/topic/messages/${roomId}`, handleNewMessage);
      }
    });

    // 컴포넌트 언마운트 시 SockJS 연결 해제
    return () => {
      if (stomp.connected) {
        stomp.disconnect();
      }
    };
  }, [roomId]);

  const handleExitRoom = () => {
    setExitRoom(true);
    navigate(-1);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  };

  const sendMessage = () => {
    if (stompClient && inputMessage.trim() !== '') {
      const message = { content: inputMessage };

      stompClient.send(
        `/app/sendMessage/${roomId}/${username}/${inputMessage}`,
        {},
        JSON.stringify(message)
      );

      console.log(JSON.stringify(message));
      setInputMessage('');
    }
  };

  useEffect(() => {
    // 메시지가 업데이트될 때마다 스크롤을 아래로 이동
    const scrollToBottom = () => {
      if (contentRef.current) {
        contentRef.current.scrollTop = contentRef.current.scrollHeight;
      }
    };

    scrollToBottom();
  }, [messages]);

  return (
    <div className='all-container'>
      <div className='List'>
        {exitRoom ? (
          <p>out</p>
        ) : (
          <button onClick={handleExitRoom}>방 나가기</button>
        )}
        <h2>Chat Room</h2>
        <div className='chat-container'>
          <div className='contentdesign chat-messages' ref={contentRef}>


            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.username === username ? 'right-aligned' : ''}`}>
                <div className=''>
                  {msg.username !== username && msg.username !== messages[index - 1]?.username && (
                    <p
                      className='message-username'
                      style={{ color: msg.username === username ? 'red' : 'inherit' }}
                    >
                      {msg.username}
                    </p>
                  )}
                  {msg.username === username ? (
                    <>
                      {msg.createDate && (
                        <span className='message-date'> {new Date(msg.createDate).toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}</span>
                      )}
                      <p className='message-content'>{msg.content}</p>
                    </>
                  ) : (
                    <>
                      <p className='message-content'>{msg.content}</p>
                      {msg.createDate && (
                        <span className='message-date'> {new Date(msg.createDate).toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}</span>
                      )}
                    </>
                  )}
                </div>
              </div>
            ))}







          </div>
        </div>
      </div>
      <div className='chatInputContainer'>
        <input
          className='messageInput'
          type='text'
          placeholder='Type your message...'
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className='sendMessageButton' onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default RoomDetail;
