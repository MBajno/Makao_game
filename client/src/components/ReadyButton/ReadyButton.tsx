import ApiRoom from '@api/ApiRoom'
import React, { useState, useContext} from 'react'
import style from "./ReadyButton.module.scss"
import { RoomContext }  from 'src/provider/roomProvider/roomProvider';
import { PlayerContext} from 'src/provider/playerProvider/playerProvider';

const ReadyButton = (props: any) => {

    const [statusPlayer, setStatusPlayer] = useState(1)
    const apiRoom = new ApiRoom();

    const {token} = useContext(PlayerContext);
    
    const {
        room     
      } = useContext(RoomContext);

    return (
        <>
            {
                !!statusPlayer &&
                    <div className={style.container}>
                        <input 
                            type="submit" 
                            value="ready"
                            onClick={() => {
                                apiRoom.ready(room, token)
                                    .then(res => {
                                        setStatusPlayer(0);
                                    })
                                    .catch(err => {
                                        setStatusPlayer(1);
                                    })
                            }} 
                        />
                    </div>
            }
        </>
        
    )
}

export default ReadyButton