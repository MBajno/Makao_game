import React, { createContext, useState, useCallback } from "react"
//import { useContext } from "react";

import ApiAuth from "@api/ApiAuth";

import SocketType from "./types/playerTypeProvider";
//import { RoomContext } from "../roomProvider/roomProvider";

import Socket from "@socket/index";

const apiAuth = new ApiAuth();

export class RoomOBJ {
    public static nameRoom: string;
} 

export const PlayerContext = createContext<SocketType>(undefined!);

export const PlayerProvider = (props: any) => {  
  
  const [socket, _setSocket] = useState(Socket.getInsatance());
  const [player, setPlayer] = useState('');
  const [token, setToken] = useState('');

  const register = useCallback((id: number, name: string, password: string) => {
    return new Promise<string>((resolve, reject) => {
        apiAuth
          .register(id, name, password)
          .then(res => {
            setToken(res.data.token);
            setPlayer(name);
            socket.send(name);
            resolve(res.data.token);
          })
          .catch(err => {
            console.log(err);
            reject(err);
          });
    });
  }, [player]);

  return (
    <PlayerContext.Provider value={{socket, player, register, token}}>
      {props.children}
    </PlayerContext.Provider>
  );
};