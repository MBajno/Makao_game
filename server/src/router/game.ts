

import express from 'express'
import Log from '../middleware/Log';
import Users from '../store/Users';
import { Rooms } from '../store/Rooms';
import auth from './../middleware/auth';

const game = express.Router();

// POBIERANIE STANU GRY
game.get('/:room', auth, (req: any, res: any) => {
    
    // TODO: ZROBIĆ WALIDACJIE

    // POBIERANI INSTANCJI POKOI
    const rooms = Rooms.getInsatance();

    // POBIERANIE INSTANCJI GRACZY
    const instanceUser = Users.getInsatance();

    try
    {
        // POBRANIE OBIEKTU GRACZA
        const player = instanceUser.getByID(req.user.id);

        if(!rooms.isReady(req.params.room)) 
            throw new Error("Players isn't ready");

        // POBRANIE ODPOWIEDNIE GRY
        const game = rooms.getGame(req.params.room, player.id); 

        const gameStats = game.get(player.id);

        let info = "";
        
        // INFORMACJE NATEMAT RUCHU
        if((rooms.getPlayers(req.params.room, player.id))[gameStats.playerWithMove] == player.id) {
            info = "TWÓJ RUCH";
        } else if ((rooms.getPlayers(req.params.room, player.id))[gameStats.playerWithMove]) {
            // POBRANIE OBIEKTU GRACZA
            const playerWithMove = instanceUser.getByID(rooms.getPlayers(req.params.room, player.id)[gameStats.playerWithMove]);
            info = `RUCH GRACZA ${playerWithMove.name}`;
        }

        if(gameStats.winner) {
            // POBRANIE OBIEKTU GRACZA
            const playerWinner = instanceUser.getByID(gameStats.winner);
            info = `Wygrał gracz ${playerWinner.name}`;
        }
            
        res.status(200).json({
            data: {
                info: info,
                move: gameStats.move,
                hand: gameStats.hand,
                player: gameStats.player
            }
        });
    } 
    catch (e) {
        //WYPISANIE BŁEDU
        Log.Error((e as Error).message, `GET: /game/${req.params.room}/`);

        //WYSŁANIE BŁEDU
        res.status(404).json({
            message: (e as Error).message
        });
    }
    
});

game.post('/:room', auth, (req: any, res: any) => {
    
    // TODO: ZROBIĆ WALIDACJIE

    // POBIERANI INSTANCJI POKOI
    const rooms = Rooms.getInsatance();

    // POBIERANIE INSTANCJI GRACZY
    const instanceUser = Users.getInsatance();
    
    try 
    {
        // POBRANIE OBIEKTU GRACZA
        const player = instanceUser.getByID(req.user.id);

        if(!rooms.isReady(req.params.room)) 
            throw new Error("Players isn't ready");

        // POBRANIE ODPOWIEDNIE GRY
        const game = rooms.getGame(req.params.room, player.id); 

        // DODANIE NOWEGO RUCHU
        game.move(player.id, req.body.card);

        const arrPlayers = rooms.getPlayers(req.params.room, player.id);
             
        // WYMUSZENIE POBRANIA HISTORI CHAT PRZEZ INNYCH UCZESTNIKÓW CHAT
        arrPlayers.forEach((p: number) => {
            try{
                instanceUser.sendInfoSocket(p);
            }
            catch(err) {
                //WYPISANIE BŁEDU
                Log.Error((err as Error).message, null);
            }
        });

        res.status(200).json({
            message: 'OK'
        });
    } 
    catch (e) {
        //WYPISANIE BŁEDU
        Log.Error((e as Error).message, `POST: /game/${req.params.room}/`);

        //WYSŁANIE BŁEDU
        res.status(404).json({
            message: (e as Error).message
        });
    } 
});

game.post('/:room/skip', auth, (req: any, res: any) => {
    
    // TODO: ZROBIĆ WALIDACJIE

    // POBIERANI INSTANCJI POKOI
    const rooms = Rooms.getInsatance();

    // POBIERANIE INSTANCJI GRACZY
    const instanceUser = Users.getInsatance();
    
    try 
    {
        // POBRANIE OBIEKTU GRACZA
        const player = instanceUser.getByID(req.user.id);

        if(!rooms.isReady(req.params.room)) 
            throw new Error("Players isn't ready");

        // POBRANIE ODPOWIEDNIE GRY
        const game = rooms.getGame(req.params.room, player.id); 

        // WYKONANIE SKIPU
        game.move(player.id);

        const arrPlayers = rooms.getPlayers(req.params.room, player.id);
             
        // WYMUSZENIE POBRANIA HISTORI CHAT PRZEZ INNYCH UCZESTNIKÓW CHAT
        arrPlayers.forEach((p: number) => {
            try{
                instanceUser.sendInfoSocket(p);
            }
            catch(err) {
                //WYPISANIE BŁEDU
                Log.Error((err as Error).message, null);
            }
        });

        res.status(200).json({
            message: 'OK'
        });
    } 
    catch (e) {
        //WYPISANIE BŁEDU
        Log.Error((e as Error).message, `POST: /game/${req.params.room}/skip/`);

        //WYSŁANIE BŁEDU
        res.status(404).json({
            message: (e as Error).message
        });
    }
});

export default game;