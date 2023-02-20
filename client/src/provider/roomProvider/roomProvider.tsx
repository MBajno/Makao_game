import React, { createContext, useState, useCallback } from "react"

import ApiRoom from '@api/ApiRoom';
import ApiChat from "@api/ApiChat";
import ApiGame from "@api/ApiGame";

import RoomProviderType from "./types/roomTypeProvider";

const apiRoom = new ApiRoom();
const apiChat = new ApiChat();
const apiGame = new ApiGame();

export const RoomContext = createContext<RoomProviderType>(undefined!);

export const RoomProvider = (props: any) => {
  
  // LISTA WIADOMOŚCI  
  const [message, setMessage] = useState([]);
  
  // ID POKOJU
  const [room, setRoom] = useState("");
  
  // LISTA POKOI
  const [listRooms, setListRooms] = useState([]);
  
  // KARTY GRACZA  
  const [myHand, setMyHand] = useState([]);
  
  // INFORMACJIE O ILOSCI KARD U GRACZY
  const [otherPlayerCard, setOtherPlayerCard] = useState([]);
  
  // HISTORIA RUCHÓW W GRZE
  const [moves, setMoves] = useState([]);

  // STATUS GRY
  const [statusGame, setStatusGame] = useState(0);

  const [info, setInfo] = useState('');

  // POBRANIE WIADOMOŚCI
  const fetchMessage = useCallback((room: string, token: string) => {
      apiChat
        .message(room, token)
        .then(res => {
          setMessage(res.data.data);
        })
        .catch(err => {
          console.log(err);
        });
  }, [message]);

  // POBRANIE GRY
  const fetchGame = useCallback((room: string, token: string) => {
    return new Promise<boolean>((resolve, reject) => {
      apiGame
        .moves(room, token)
        .then(res => {
          setMyHand(res.data.data.hand.cards);
          setOtherPlayerCard(res.data.data.player);
          setMoves(res.data.data.move);
          setInfo(res.data.data.info);
          resolve(true);
        })
        .catch(err => {
          console.log(err);
          reject(false);
        });
    }); 
  }, [myHand, otherPlayerCard, moves, info])

  // DOŁĄCZENIE DO GRY
  const joinRoom = useCallback((room: string, token: string) => {
    return new Promise<string>((resolve, reject) => {  
      apiRoom
        .joinRoom(room, token)
        .then(res => {
          setRoom(room);
          resolve(room);
        })
        .catch(err => {
          console.log(err);
          reject(err);
        })
      });
  }, [room]);

  // POBRANIE LISTY POKOI
  const fetchListRoom = useCallback(() => {
    return new Promise<boolean>((resolve, _reject) => {
      apiRoom
        .get()
        .then(res => {
          setListRooms(res.data.data);
          resolve(true);
        })
        .catch(err => {
          console.log(err);
        });
    });
  }, [listRooms]);

  // POBIERANIE STATUSU GRY
  const fetchGameStatus = useCallback((room: string, token: string) => {
    return new Promise<boolean>((resolve, reject) => {
      apiRoom
        .isReady(room, token)
        .then(res => {
          setStatusGame(1);
          console.log("sprawdzam");
          resolve(true);
        })
        .catch(err => {
          setStatusGame(0);
          console.log("da");
          reject(false);
        });
    });
  }, [statusGame])



  return (
    <RoomContext.Provider value={{
      message, 
      fetchMessage, 
      myHand, 
      otherPlayerCard, 
      moves, 
      info,
      fetchGame, 
      room, 
      joinRoom, 
      listRooms, 
      fetchListRoom, 
      statusGame,
      fetchGameStatus,
    }}>
      {props.children}
    </RoomContext.Provider>
  );
};