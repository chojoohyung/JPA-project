import React, { useEffect, useState } from 'react';


export default function Login() {
    const [id, setId] = useState("");
    const [idValid, setIdValid] = useState(false);
    const [notAllow, setNotAllow] = useState(true);

    const handleId = (e) => {
        const inputValue = e.target.value;

      
        const isValidInput = /^.{4,}$/.test(inputValue);


        
        setIdValid(isValidInput);

      
        setId(inputValue);
    }

    useEffect(() => {
      if(idValid){
        setNotAllow(false);
        return;
      }
      setNotAllow(true);
    }, [idValid]);

    return (
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
                        value={id}
                        onChange={handleId} />
                </div>
                <div className='errorMessage'>
                    {
                        !idValid && id.length > 0 && (
                            <div>4자 이상 입력해주세요</div>
                        )
                    }
                </div>

                <div>
                    <button disabled={notAllow} className='bottomButton'>
                        입장
                    </button>
                </div>
            </div>
        </div>
    );
}
