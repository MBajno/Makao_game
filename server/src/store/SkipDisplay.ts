import Symbols from "./enum/symbols";
import MathGame from "./MathGame";
import Players from "./Players";
import Roules from "./Roules";

export default class SkipDisplay {

    // GRACZ MAJĄCY SKIP 
    skipPlayer: number | null = null;

    // USTAWIENIE KOLEJNEMU GRACZOWI SKIPA
    setSkip(players: Players, playerIndex: number | undefined, card: Symbols | null) {

        if(playerIndex === undefined)
            throw new Error("N");

        this.skipPlayer = null;

        if(!card) 
            return;
        
        // WYZNACZENIE NOWEGO GRACZA DO SKIPU
        if(MathGame.isFour(card)) 
            this.skipPlayer = players.nextPlayer(playerIndex);               
    }

    // SPRAWDZENIE CZY GRACZ MUSI SKIPOWAĆ
    isSkip(card: Symbols, lastMove: Symbols | undefined, playerIndex: number | undefined) {
        
        if(playerIndex === undefined)
            throw new Error("N");

        if(this.skipPlayer != null)
            if(this.skipPlayer == playerIndex) 
                return Roules.isSkip(card, lastMove);

        return false;
    }
}