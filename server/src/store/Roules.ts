import Symbols from "./enum/symbols";
import MathGame from "./MathGame";

export default class Roules {


    // SPRAWDZENIE CZY GRACZ MOŻE WYKONAĆ RUCH
    static isMove(newCard: Symbols, oldCard: Symbols | undefined = undefined) {
        
        if(oldCard == undefined)
            return true;

        if(MathGame.isQueen(newCard))
            return true;

        if(MathGame.isQueen(oldCard))
            return true;

        if(oldCard == Symbols["♠_KK"] && newCard == Symbols["♣_KK"] || newCard == Symbols["♠_KK"] && oldCard == Symbols["♣_KK"]) 
            return false;

        // SPRAWDZENIE KOLORU
        if(MathGame.sameColor(newCard, oldCard))
            return true;

        // SPRAWDZANIE WARTOSCI 
        if(MathGame.sameType(newCard, oldCard)) 
            return true;

        return false;
    }

    // SPRAWDZENIE CZY GRACZ MUSI SKIPOWAĆ
    static isSkip(newCard: Symbols, oldCard: Symbols | undefined = undefined) 
    {
        if(oldCard == undefined)
            return false;

        if(MathGame.isFour(oldCard) && !MathGame.isFour(newCard))
            return true;

        return false;
    }

    // SPRAWDZENIE CZY GRACZ NIE MUSI WYBRAĆ KART
    static isThrow(throwCard: any, newCard: Symbols, oldCard: Symbols | undefined = undefined) {
        
        if(oldCard == undefined)
            return false;

        if(throwCard) {
            
            const oldCardIs = MathGame.isTwo(oldCard) 
                || MathGame.isTree(oldCard) 
                || MathGame.inArray(oldCard, [Symbols["♠_KK"], Symbols["♣_KK"]]);

            const newCardIs = MathGame.isTwo(newCard) 
                || MathGame.isTree(newCard) 
                || MathGame.inArray(newCard, [Symbols["♠_KK"], Symbols["♣_KK"]]);

            if(oldCardIs && !newCardIs)
                return true;
        }

        return false;
    }

    // USTAWIENIE INNEMU GRACZOWI SKIPA
    static setThrow(card: Symbols | undefined = undefined) {

        if(card === undefined)
            return {count: 0, reverse: false};

        if(MathGame.isTwo(card))
            return {count: 2, reverse: false};

        if(MathGame.isTree(card))
            return {count: 3, reverse: false};

        if(MathGame.isTheSame(card, Symbols["♠_KK"]))
            return {count: 5, reverse: false};
        
        if(MathGame.isTheSame(card, Symbols["♣_KK"]))
            return {count: 5, reverse: true};

        return {count: 0, reverse: false};
    }
}