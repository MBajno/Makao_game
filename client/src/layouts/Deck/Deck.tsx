import React from "react";
import styles from './deck.module.scss'

const Deck = (props: any) => {

    return (
        <div className={styles.container}>
            {
                props.children &&
                    props.children.map((child: any, index: number) => {
                        return (
                            <div className={styles.card} style={{left: `${35*index}px`}}>
                                {child}
                            </div>
                        )
                    })
            }
        </div>
    );
}

export default Deck;