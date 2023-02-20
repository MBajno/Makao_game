import React from "react"
import style from "./Message.module.scss"

const Message = (props: any) => {
    return (
        <div className={style.container}>
            <div className={style.post}>
                <span className={style.author}>{props.content.author}</span>
                <span className={style.description}>{props.content.content}</span>
            </div>
        </div>
    )
}

export default Message;