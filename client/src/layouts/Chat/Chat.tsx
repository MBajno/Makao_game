import React from "react";
import style from "./Chat.module.scss"

const Chat = (props: any) => {

    const input = React.Children.map(props.children, child => child.type.displayName === 'Input' ? child : null);

    return(
        <div className={style.container}>
            <div className={style.history}>
                {
                    props.history.map( (el: any) => {
                        return props.renderMessage 
                            ? props.renderMessage(el) 
                            : <div>{el}</div>
                        }).reverse()
                }
            </div>
            <div className={style.input}>
                {input}
            </div>
        </div>
    )
}

const input = (props: any) => props.children;
input.displayName = 'Input';
Chat.input = input;

export default Chat;