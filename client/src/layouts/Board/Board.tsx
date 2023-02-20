import Card from "@components/Card/Card";
import React from "react";
import styles from './board.module.scss'
import Deck from "@layouts/Deck/Deck";

const Board = (props: any) => {

    const enemy = Array(props.enemy | 0).fill(0);

    return (
        <div className={styles.container}>
            <div className={styles.center}>
                <Deck>
                    { 
                        enemy.map((card: number) => <Card/>)
                    }
                </Deck>
            </div>
            <div className={styles.center}>
                <Card
                  symbols={props.stack}
                />
            </div>
            <div className={styles.center}>
                {props.children}
            </div>
        </div>
    );
}

export default Board;