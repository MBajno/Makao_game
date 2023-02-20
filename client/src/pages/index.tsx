import type { NextPage } from 'next'
import React, { useContext, useEffect } from 'react';
import { useRouter } from "next/router";

import ListRoomElement from '@components/ListRoomElement/ListRoomElement';

import Panel from '@layouts/Panel/Panel';
import ListRooms from '@layouts/ListRooms/ListRooms';

import { RoomContext } from 'src/provider/roomProvider/roomProvider';
import { PlayerContext } from 'src/provider/playerProvider/playerProvider';

const Home: NextPage = () => {
  const {socket, register} = useContext(PlayerContext);
  const {listRooms, fetchListRoom, joinRoom} = useContext(RoomContext);

  const router = useRouter();

  useEffect(() => {
    socket.setRefreshRoom(() => {
      fetchListRoom();
    });

    fetchListRoom();
  }, []);

  const join = () => {
    
    const id = new Date().getTime();

    register(id, `GUEST_${id.toString().slice(id.toString().length-5, id.toString().length)}`, "test")
      .then(res => {
        joinRoom(id.toString(), res)
          .then(res => {
            router.push(`/room/${id.toString()}`);
          });
      })
      .catch(err => {
        console.log(err);
      })

  }

  return (
    <Panel>   
      
      <Panel.left>
        <p>Lista pokoi</p>
        <ListRooms
          listRooms={listRooms}
          renderRoom={(el: any) => 
            <ListRoomElement
              name={el.name}
              size="5" 
              key={el.name}
            />
          }
        />
      </Panel.left>
      
      <Panel.right>
        <p>Stwórz pokój</p>
        <button onClick={join}>join</button>
      </Panel.right>
    
    </Panel>
  )
}

export default Home
