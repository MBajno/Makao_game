
import express from 'express'
import Log from '../middleware/Log';

const player = express.Router();

player.get('/', (_req: any, res: any) => {
    
    // TODO: ZROBIĆ WALIDACJIE

    try
    {
        // TODO: POBIERANIE LISTY GRACZY
    } 
    catch (e) {
        //WYPISANIE BŁEDU
        Log.Error((e as Error).message, null);

        //WYSŁANIE BŁEDU
        res.status(404).json({
            message: (e as Error).message
        });
    }
    
})

export default player;