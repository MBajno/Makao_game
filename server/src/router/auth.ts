
import express from 'express'
import Users from '../store/Users';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import Log from '../middleware/Log';

const auth = express.Router();

// ENDPOINT LOGOWANIA 
auth.post('/login', async (req: any, res: any) => {
    
    // POBIERANIE INSTANCJI GRACZY
    const instanceUser = Users.getInsatance();

    try 
    {
        const {id, password} = req.body;   
        
        // WALIDACJA ID I PASSWORD BŁĘDNE DANE 422
        // FIXME: DODAC SPRAWDZANIE TYPÓW CZY ID JEST INT I CZY PASSWORD MA PRAWIDŁOWE ZNAKI  
        if(!(id && password)) {
            res.status(422).json({
                message: "Need id and name"
            });
        }

        // POBIERANIE GRACZA ODPOWIDAJĘCEGO ID
        const objPlayer = instanceUser.getByID(id)

        // GDY NIEMA GRACZA ZWRÓĆ 409
        if(!objPlayer) {
            return res.status(409).json({
                message: "User exist"
            });
        }

        // SPRAWDZANIE POPRAWNOŚCI HASŁA 
        if(!(await bcrypt.compare(password, objPlayer.password))) {
            return res.status(409).json({
                message: "Wrong Password"
            });
        }

        // TWORZENIE TOKENA 
        //FIXME: SECRET POWINIEN BYĆ ZAPISANY W .ENV 
        const token = jwt.sign({
            id: objPlayer.id, 
            name: objPlayer.name
        }, 
        "makaoipomakale", 
        {
            expiresIn: "2h"
        });

        // ZWRÓCENIE TOKENA
        res.status(200).json({
            token: token
        })
    }
    catch(err) {
        //WYPISANIE BŁEDU
        Log.Error((err as Error).message, '/auth/login');
        
        //WYSŁANIE BŁEDU
        res.status(404).json({
            message: (err as Error).message
        });
    }    
});

//REJESTRACJA 
auth.post('/register', async (req: any, res: any) => {
    
    // POBIERANIE INSTANCJI GRACZY
    const instanceUser = Users.getInsatance();

    try 
    {

        const {id, name, password} = req.body;   

        // SPRAWDZNIE DNYCH WEJŚCIOWYCH przy błędnych 422
        // FIXME: DODANIE SPRAWDZANIA poprawnosci typu
        if(!(id && name && password)) {
            res.status(422).json({
                message: "Need id and name"
            });
        }

        try {
            // POBIERANIE GRACZA
            instanceUser.getByID(id);
            
            // 409 GDY GRACZ ISTNIEJE
            return res.status(409).json({
                message: "User exist"
            });
        } 
        catch {}

        // HASH HASŁA
        const encryptedPass = await bcrypt.hash(password, 10)

        // Dodanie gracza do listy
        instanceUser.set(id, name, encryptedPass);

        // Tworzenie tokenu
        const token = jwt.sign({
            id: id, 
            name: name
        }, 
        "makaoipomakale", 
        {
            expiresIn: "2h"
        });

        // Wysłanie tokenu
        res.status(200).json({
            token: token
        })
    }
    catch(err) {
        //WYPISANIE BŁEDU
        Log.Error((err as Error).message, '/auth/register');
        
        //WYSŁANIE BŁEDU
        res.status(404).json({
            message: (err as Error).message
        });
    }
});

export default auth;