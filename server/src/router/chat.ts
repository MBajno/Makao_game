
import express  from 'express'
import Log      from '../middleware/Log';
import Users    from '../store/Users';
import { Rooms }from '../store/Rooms';
import Message  from '../store/types/Message';
import auth     from './../middleware/auth';

const chat = express.Router();

// POBRANIE CHAT Z DANEGO POKOJU
chat.get('/:room', auth, (req: any, res: any) => {
    
    // TODO: ZROBIĆ WALIDACJIE
    
    // POBIERANI INSTANCJI POKOI
    const rooms = Rooms.getInsatance();

    // POBIERANIE INSTANCJI GRACZY
    const instanceUser = Users.getInsatance();
    
    try 
    { 
        // POBRANIE OBIEKTU GRACZA
        const user = instanceUser.getByID(req.user.id);

        // POBRANIE ODPOWIEDNIEGO CHAT
        const chat = rooms.getChat(req.params.room, user.id); 
        
        // ZWRUCENIE LISTY WIADOMOŚCI
        res.status(200).json({
            data: chat.get().map((messange: Message) => {
                return {
                    author: instanceUser.getByID(messange.authorID).name,
                    content: messange.content
                }
            })
        });
    } 
    catch (e) {
        //WYPISANIE BŁEDU
        Log.Error((e as Error).message, `GET: /chat/${req.params.room}/`);
        
        //WYSŁANIE BŁEDU
        res.status(404).json({
            message: (e as Error).message
        });
    }
});

chat.post('/:room', auth, (req: any, res: any) => {
    
    // TODO: ZROBIĆ WALIDACJIE
    
    // POBIERANI INSTANCJI POKOI
    const rooms = Rooms.getInsatance();

    // POBIERANIE INSTANCJI GRACZY
    const instanceUser = Users.getInsatance();
    
    try 
    {
   
        // POBRANIE OBIEKTU GRACZA
        const user = instanceUser.getByID(req.user.id);

        // POBRANIE ODPOWIEDNIEGO CHAT
        const chat = rooms.getChat(req.params.room, user.id); 
        
        // WIADOMOŚĆ
        const content: string = req.body.message;

        // DODANIE WIADOMOŚCI DO CHAT
        chat.add({
            content, 
            authorID: user.id
        });

        const players = rooms.getPlayers(req.params.room, user.id);
             
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
            message: 'OK'
        });
    } 
    catch (e) {
        //WYPISANIE BŁEDU
        Log.Error((e as Error).message, `POST: /chat/${req.params.room}/`);

        //WYSŁANIE BŁEDU   
        res.status(404).json({
            message: (e as Error).message
        });
    }

    res.status(200).json({
        message: 'Message OK'
    }); 
});

export default chat;