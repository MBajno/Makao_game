import React, { useState } from "react";
import styles from './GameRoom.module.scss'

const GameRoom = (props: any) => {

    const [tab, setTab] = useState(0);

    const board = React.Children.map(props.children, child => child.type.displayName === 'Board' ? child : null);
    const sideBoard = React.Children.map(props.children, child => child.type.displayName === 'SideBoard' ? child : null);
    const chat = React.Children.map(props.children, child => child.type.displayName === 'Chat' ? child : null);
    
    return (
        <div className={styles.gameRoom}>
            <div className={styles.board}>
                {board}
            </div>
            <div className={styles.menu}>
                <div className={styles.menuItems}>
                    <div className={`${styles.menuItem} ${tab == 0 && styles.active}`} onClick={() => setTab(0)}>
                        <p>panel</p>
                    </div>
                    <div className={`${styles.menuItem} ${tab == 1 && styles.active}`} onClick={() => setTab(1)}>
                        <p>czat</p>
                    </div>
                </div>
                <div className={styles.listContent}>
                    <div className={`${styles.content} ${tab == 0 && styles.active}`}>
                        {sideBoard}
                    </div>
                    <div className={`${styles.content} ${tab == 1 && styles.active}`}>
                        {chat}
                    </div>
                </div>
            </div>
        </div>
    );
}

const board = (props: any) => props.children;
board.displayName = 'Board';
GameRoom.board = board;

const sideBoard = (props: any) => props.children;
sideBoard.displayName = 'SideBoard';
GameRoom.sideBoard = sideBoard;

const chat = (props: any) => props.children;
chat.displayName = 'Chat';
GameRoom.chat = chat;

export default GameRoom;