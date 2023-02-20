import * as jwt from 'jsonwebtoken';

// FUNKCJA DO AUTORYZACJI URZYTKOWNIKA NA PODSTAWIE TOKENA
const auth = async (req: any, res: any, next: any) => {
    // SPRAWDZNIE POBIERANIE TOKENA NA 3 SPOSOBY PRZEKAZANIA
    const token = req.body.token || req.query.token || req.headers["x-access-token"]

    
    // JEŚLI NIE MA TOKENA ZWRÓĆ 403 
    if(!token) {
        res.status(403).json({
            message: "No have access token"
        });
        return;
    }
        
    try {
        //ODKODOWANIE URZYTKOWNIKA I PRZEKAZANIE DANYCH DALEJ
        const decoded = jwt.verify(token, "makaoipomakale");
        req.user = decoded;
    }
    catch(err) {
        // JEŚLI TOKEN JEST NIE WŁAŚCIWY ZWRÓĆ 403
        res.status(403).json({
            message: "Invalid token"
        });
    }
    return next();
}

export default auth