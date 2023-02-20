import React, { useContext } from "react"
import style from "./ListRoomElement.module.scss"
import { PlayerContext } from 'src/provider/playerProvider/playerProvider';
import { useRouter } from "next/router";
import { RoomContext } from 'src/provider/roomProvider/roomProvider';

const MAX_ROOM_SIZE = 5;

const ListRoomElement = (props: any) => {

    const router = useRouter();
    const {register} = useContext(PlayerContext);
    const {joinRoom} = useContext(RoomContext);

    const join = () => {
        const id = new Date().getTime();
        
        register(id, `GUEST_${id.toString().slice(id.toString().length-5, id.toString().length)}`, "test")
            .then(res => {
                joinRoom(props.name, res)
                    .then(res => {
                        router.push(`/room/${props.name}`);
                    });
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <div className={style.container}>
            <span>{props.name}</span>
            <span>{props.size}/{MAX_ROOM_SIZE}</span>
            <button onClick={join}>Join</button>
        </div>
    )
}

export default ListRoomElement