import express from 'express'
import Log from '../middleware/Log';
import Users from "../store/Users";
import { Rooms } from "../store/Rooms";
import auth from './../middleware/auth';

const room = express.Router();

// POBIERANIE LISTY POKOI
room.get('/', (_req: any, res: any) => {
    
    // TODO: ZROBIĆ WALIDACJIE

    // POBIERANI INSTANCJI POKOI
    const rooms = Rooms.getInsatance();
    
    try 
    {
        // ZWRÓCENIE LISTY POKOI
        res.status(200).json({
            data: rooms.getRooms()
        })
    } 
    catch (e) {
        //WYPISANIE BŁEDU
        Log.Error((e as Error).message, `GET: /room/`);

        res.status(404).json({
            message: (e as Error).message
        });
    }
})

room.post('/join', auth, (req: any, res: any) => {

    // TODO: ZROBIĆ WALIDACJIE

    // POBIERANI INSTANCJI POKOI
    const rooms = Rooms.getInsatance();
    
    // POBIERANIE INSTANCJI GRACZY
    const instanceUser = Users.getInsatance();
    
    try 
    {
        const objPlayer = instanceUser.getByID(req.user.id);
        
        rooms.newRoom(req.body.name, objPlayer.id);

        const players = rooms.getPlayers(req.body.name, objPlayer.id);
             
        players.forEach((p: number) => {
            try{
                instanceUser.sendInfoSocket(p);
            }
            catch(err) {
                //WYPISANIE BŁEDU
                Log.Error((err as Error).message, null);
            }
        });

        res.status(200).json({
            message: 'Join room'
        });
    } 
    catch (e) {
        //WYPISANIE BŁEDU
        Log.Error((e as Error).message, `POST: /room/join`);

        //WYSŁANIE BŁEDU
        res.status(404).json({
            message: (e as Error).message
        });
    }
});

room.get('/:room/ready', auth, (req: any, res: any) => {
    // TODO: ZROBIĆ WALIDACJIE

    // POBIERANI INSTANCJI POKOI
    const rooms = Rooms.getInsatance();

    // POBIERANIE INSTANCJI GRACZY
    //const player = Players.getInsatance();

    try 
    {
        //const objPlayer = player.getByID(req.user.id);
        
        if(!rooms.isReady(req.params.room)) 
            throw new Error('Game not ready');

        res.status(200).json({
            message: 'READY OK'
        });
    } 
    catch (e) {
        //WYPISANIE BŁEDU
        Log.Error((e as Error).message, `GET: /room/${req.params.room}/ready`);

        //WYSŁANIE BŁEDU   
        res.status(404).json({
            message: (e as Error).message
        });
    }
})

room.post('/:room/ready', auth, (req: any, res: any) => {
    
    // TODO: ZROBIĆ WALIDACJIE
    
    // POBIERANI INSTANCJI POKOI
    const rooms = Rooms.getInsatance();

    // POBIERANIE INSTANCJI GRACZY
    const instanceUser = Users.getInsatance();

    try 
    {
        const objPlayer = instanceUser.getByID(req.user.id);
        
        rooms.ready(req.params.room, objPlayer.id);
       
        if(rooms.isReady(req.params.room)) {
            const game = rooms.getGame(req.params.room, objPlayer.id);

            game.start(rooms.getPlayers(req.params.room, objPlayer.id));
        }

        const players = rooms.getPlayers(req.params.room, objPlayer.id);
             
        // WYMUSZENIE POBRANIA HISTORI CHAT PRZEZ INNYCH UCZESTNIKÓW CHAT
        players.forEach((p: number) => {
            try{
                instanceUser.sendInfoSocket(p);
            }
            catch(err) {
                //WYPISANIE BŁEDU
                Log.Error((err as Error).message, null);
            }
        });

        res.status(200).json({
            message: 'READY OK'
        }); 
    } 
    catch (e) {
        //WYPISANIE BŁEDU
        Log.Error((e as Error).message, `POST: /room/${req.params.room}/ready`);

        //WYSŁANIE BŁEDU   
        res.status(404).json({
            message: (e as Error).message
        });
    }
})

export default room;