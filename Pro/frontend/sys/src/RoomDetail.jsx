import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RoomDetail = () => {
    
  const [exitRoom, setExitRoom] = useState(false);
  const navigate = useNavigate();
  const handleExitRoom = () => {
    setExitRoom(true);
    navigate(-1);
  };
  

  return (
    <div>
      <h2>채팅방 내용</h2>
      
  
      {exitRoom ? (
        <p>out</p>
      ) : (
        <button onClick={handleExitRoom}>방 나가기</button>
      )}
    </div>
  );
};

export default RoomDetail;
