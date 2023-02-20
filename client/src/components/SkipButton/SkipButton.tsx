import ApiGame from '@api/ApiGame';
import React, { useContext } from 'react'
import style from "./SkipButton.module.scss"
import { RoomContext }  from 'src/provider/roomProvider/roomProvider';
import { PlayerContext} from 'src/provider/playerProvider/playerProvider';


const ReadyButton = (props: any) => {

    const apiGame = new ApiGame();

    const {token} = useContext(PlayerContext);
    
    const {room, info, fetchGame} = useContext(RoomContext);

    return (
      <>
      { 
        !!info &&
          <div className={style.container}>
                <p>{info}</p>            
                <input 
                  type="submit"
                  value="skip"
                  onClick={() => {
                    apiGame.skip(room, token)
                      .then(res => {
                          fetchGame(room, token);
                        })
                      .catch(err => {
                          fetchGame(room, token);
                          console.log(err);
                        })
                  }} 
                /> 
              
          </div>
      }
      </>
    )
}

export default ReadyButton