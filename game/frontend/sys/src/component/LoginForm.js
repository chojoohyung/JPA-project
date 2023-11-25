import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = () => {
    const [username, setUsername] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post('/api/login', { username });
            console.log(response.data); // 로그인 성공 시 처리
        } catch (error) {
            console.error('로그인 실패', error); // 로그인 실패 시 처리
        }
    };

    return (
        <div>
            <div className='Logintext'>LOGIN</div>
            <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} /><br></br>
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default LoginForm;