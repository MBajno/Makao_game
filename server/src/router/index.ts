import player from "./player";
import room from "./room";
import auth from "./auth";
import chat from "./chat";
import game from "./game";

export default (app: any) => {

    app.use('/player', player); 
    app.use('/room', room);
    app.use('/auth', auth);
    app.use('/chat', chat);
    app.use('/game', game);

    // ROOT
    app.get('/', (_req: any, res: any) => {
        res.send({
          ok: 'Serwer Działa'
        })
    }); 

    return app;
}