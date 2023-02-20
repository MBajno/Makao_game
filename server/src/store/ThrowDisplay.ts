import Symbols from "./enum/symbols";
import Roules from "./Roules";

export default class ThrowDisplay {

    // GRACZ ILE BĘDZIE MUSIAŁ WYCIĄGNĄĆ CARD
    private throwCard: number = 0;

    // SPRAWDZENIE CZY GRACZ NIE MUSI WYBRAĆ KART
    isThrow(card: Symbols, lastMove: Symbols | undefined) {
        return Roules.isThrow(this.throwCard, card, lastMove);
    }

    // USTAWIENIE INNEMU GRACZOWI SKIPA
    setThrow(card: Symbols | null) {

        const {count} = Roules.setThrow(card ? card : undefined);
        
        if(count == 0) {
            this.throwCard = 0;
            return;
        }

        this.throwCard = count;
    }

    getThrowCard() {
        if(this.throwCard == 0)
            this.throwCard = 1;

        const result = this.throwCard;

        this.throwCard = 0;

        return result;
    }
}