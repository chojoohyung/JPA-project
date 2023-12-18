// Login.jsx
import React, { useEffect, useState } from 'react';



const Login = ({ setLoggedIn }) => {

  const [username, setUsername] = useState("");
  const [usernameValid, setUsernameValid] = useState(false);
  const [notAllow, setNotAllow] = useState(true);

  useEffect(() => {
    const storedLoggedIn = localStorage.getItem('isLoggedIn');
    if (storedLoggedIn === 'true') {
      setLoggedIn(true);
    }
  }, [setLoggedIn]);

  const handleUsername = (e) => {
    const inputValue = e.target.value;
    const isValidInput = /^.{4,}$/.test(inputValue);

    setUsernameValid(isValidInput);
    setUsername(inputValue);
  }

  useEffect(() => {
    setNotAllow(!usernameValid);
  }, [usernameValid]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8081/", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `username=${encodeURIComponent(username)}`,
      });

      if (response.ok) {
        console.log("로그인 성공");
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', username);
        setLoggedIn(true);
       
      } else {
        console.error("로그인 실패");
      }
    } catch (error) {
      console.error("로그인 요청 실패", error);
    }
  };

  return (
    <div className='joinOuterContainer'>
      <div className='page'>
        <div className='titleWrap'>
          사용할 아이디를 입력해주세요 <br />
        </div>
        <div className='contentWrap'>
          <div className='inputId'>아이디</div>
          <div className='inputWrap'>
            <input
              type='text'
              className='input'
              placeholder='접속 할 아이디를 입력해주세요'
              value={username}
              onChange={handleUsername}
            />
          </div>
          <div className='errorMessage'>
            {!usernameValid && username.length > 0 && <div>4자 이상 입력해주세요</div>}
          </div>

          <div>
            <button disabled={notAllow} className='bottomButton' onClick={handleLogin}>
              입장
            </button>
            
          
           
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
