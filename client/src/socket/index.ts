import { w3cwebsocket as W3CWebSocket } from "websocket";
import SocketData from "./types/SocketData";

const URL = 'ws://localhost:4000/ws';

export default class Socket {
    
    private static instance: Socket;

    socket;

    socketData;

    private constructor() {
        this.socket = new W3CWebSocket(URL);

        this.socketData = new SocketData();

        this.socket.onopen = () => {
            this.socket.onmessage = (data: any) => {
                this.socketData.refreshChat();
                this.socketData.refreshGame();
                this.socketData.refreshReady();
                this.socketData.refreshRoom();
            }
        }
    }

    static getInsatance(): Socket {
        if(!this.instance) {
            this.instance = new Socket();
        }
        return this.instance;
    }

    send(data: any) {
        this.socket.send(data)
    }
    
    setRefreshRoom(func: () => void) {
        this.socketData.refreshRoom = func;
    }
    
    setRefreshChat(func: () => void) {
        this.socketData.refreshChat = func;
    }

    setRefreshGame(func: () => void) {
        this.socketData.refreshGame = func;
    }

    setRefreshReady(func: () => void) {
        this.socketData.refreshReady = func;
    }
}