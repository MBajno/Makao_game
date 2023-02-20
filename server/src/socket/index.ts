import { Server } from "ws"
import Users from "../store/Users";

export default (ws = new Server()) => {
    ws.on("connection", (socket) => {
        
        console.log("WebSocket connection established");

        socket.on('message', (data) => {
            
            //TODO: Walidacja

            const instanceUser = Users.getInsatance();

            try 
            {
                // TODO: ZMIENIĆ ABY MOŻNA BYŁO WYSŁAĆ RÓŻNE WIADOMOŚCI
                instanceUser.addSocket(data.toString(), () => socket.send('refresh'));
                
            } catch {}
        });
        
        socket.on("close", () => {
          console.log("WebSocket connection closed");
        });

    });

    return ws;
}
