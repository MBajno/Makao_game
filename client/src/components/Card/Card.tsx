import React from 'react'
import Symbols from './types/Symbols'
import style from './card.module.scss'
import Size from './types/Size';

export interface CardProps {
    symbols?: Symbols | undefined,
    size?: Size | undefined,
    onClick?: any
}

const Card = (props: CardProps) => {

    return (
        <img
            src="/deck.png" 
            alt='card'
            className={`${style.img} ${style[props.symbols ? Symbols[props.symbols] : 'revers']} ${style[props.size ? Size[props.size] : Size[Size.medium]]}`} 
            onClick={props.onClick}
        />
    )
}

export default Card;