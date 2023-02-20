import React, { useState} from 'react'
import style from "./MessageInput.module.scss"

const MessageInput = (props: any) => {

    const [message, setMessage] = useState('')

    return (
        <div className={style.container}>
            <input 
                className={style.text} 
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value) } 
            />
            <input 
                className={style.button} 
                type="submit" 
                onClick={() => {
                    props.sendMessage(message);
                    setMessage("");
                }} 
            />
        </div>
    )
}

export default MessageInput