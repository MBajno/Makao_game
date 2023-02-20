import type { NextPage } from 'next'
import React, { useEffect, useContext} from 'react';

import ApiChat from '@api/ApiChat';
import ApiGame from '@api/ApiGame';

import Chat     from '@layouts/Chat/Chat';
import GameRoom from '@layouts/GameRoom/GameRoom';
import Deck     from '@layouts/Deck/Deck';
import Board    from '@layouts/Board/Board';

import Card           from '@components/Card/Card';
import Message        from '@components/Message/Message';
import MessageInput   from '@components/MessageInput/MessageInput';
import ReadyButton    from '@components/ReadyButton/ReadyButton';
import SkipButton    from '@components/SkipButton/SkipButton';

import { PlayerContext} from 'src/provider/playerProvider/playerProvider';
import { RoomContext }  from 'src/provider/roomProvider/roomProvider';


const Room: NextPage = () => { 
  
  const {socket, token} = useContext(PlayerContext);
  
  const {
    message, 
    room, 
    fetchMessage, 
    fetchGame, 
    moves, 
    otherPlayerCard,
    myHand,
    fetchGameStatus,
  } = useContext(RoomContext);

  const apiGame = new ApiGame();
  const apiChat = new ApiChat();

  useEffect(() => {
    
    socket.setRefreshChat(() => {
      if(room)
        fetchMessage(room, token);
    });

    if(room)
      fetchMessage(room, token);

    socket.setRefreshReady(() => {
      if(room)
        fetchGameStatus(room, token);
    });

    if(room)
      fetchGameStatus(room, token);

    socket.setRefreshGame(()=> {
      if(room)
        fetchGame(room, token);
    });

    if(room)
        fetchGame(room, token);

  }, []);

  const sendMessage = (mes: any) => {
    apiChat
      .sendMessage(room, mes, token)
      .then(() => {
        fetchMessage(room, token);
      })
      .catch(err => {
        console.log(err);
      })
  }

  return (
    <GameRoom>
      
      <GameRoom.board>
        
        <Board
          stack={moves.length && moves[moves.length - 1].card}
          enemy={otherPlayerCard.length && otherPlayerCard[0].cards}
        >
          <Deck>
            {
              !!myHand.length &&
                myHand.map((card: number) => {
                  return (
                    <Card
                      symbols={card}
                      onClick={() => {
                        apiGame
                          .move(room, card, token)
                          .then(() => {
                            console.log("work");
                            fetchGame(room, token);
                          })
                          .catch((err) => {
                            fetchGame(room, token);
                            console.log(err);
                          })
                      }}
                    />
                  )
                })
            }
          </Deck>
            
        </Board>
        
      </GameRoom.board>

      <GameRoom.sideBoard>
        <ReadyButton />
        <SkipButton />
      </GameRoom.sideBoard>
      
      <GameRoom.chat>
        {
        message && 
          <Chat 
            history={message}
            renderMessage={(el: any) => <Message content={el} />}
          >

          <Chat.input>
            <MessageInput 
              sendMessage={sendMessage}
            />
          </Chat.input>
        
          </Chat>
        }

      </GameRoom.chat>
    
    </GameRoom>
  )
}

export default Room