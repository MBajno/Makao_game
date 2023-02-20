import Symbols from "./enum/symbols";
import Roules from "./Roules";
import Deck from "./Deck";
import Players from "./Players";
import SkipDisplay from "./SkipDisplay";
import History from "./History";
import ThrowDisplay from "./ThrowDisplay";

export default class Game { 
 
    // HISTORIA RUCHÓW
    private history = new History();

    // LISTA CARD U GRACZY
    private players: Players | undefined;

    // KARTY DO WYCIĄGANIA
    private deck: Deck | undefined;

    // GRACZ MAJĄCY RUCH
    private playerWithMove: number = 0;

    // GRACZ MAJĄCY SKIP 
    private skipDisplay = new SkipDisplay();

    // GRACZ ILE BĘDZIE MUSIAŁ WYCIĄGNĄĆ CARD
    private throwDisplay = new ThrowDisplay();

    // ID GRACZA KTÓRY WYGRAŁ
    private winner: number | undefined = undefined;

    // TASOWANIE KART I USTAWIENIE POCZĄTKOWEJ ROZGRYWKI
    start(players: Array<number>) {

        //Utworzenie Deck 
        this.deck = new Deck();

        // TWORZENIE GRACZY
        this.players = new Players(players);

        // DODAWANIE CARD
        const card = this.deck.throwCard(this.players.countPlayer() * 5);
        this.players.deal(card);

    }

    move(player: number, card: Symbols | undefined = undefined) {

        if(this.winner)
            throw new Error('Game over');
    
        // sprawdzenie czy gra wystartowała
        if(!this.players || !this.deck)
            throw new Error('Game not started');

        //SPRAWDZENIE CZY TO JEST KOLEJ GRACZA
        if(!(this.players.indexOf(player) == this.playerWithMove)) 
            throw new Error('Not your move');

        // PRZY SKIPIE
        if(!card) {
            // GRACZ WYCIĄGA KARTĘ
            const cards = this.deck.throwCard(this.throwDisplay.getThrowCard());
            this.players.pushCards(player, cards);

            // USTAWIENIE SKIPA DLA KOLEJNEGO GRACZA JESLI WYMAGA OD TEGO ROZGRYWAKA
            this.skipDisplay.setSkip(this.players, this.players.indexOf(player), null);

            // USTAWIENIE WYCIĄGANIA KARD JESLI WYMAGA OD TEGO ROZGRYWAKA
            this.throwDisplay.setThrow(null);

            // USTAWINIE RUCHU DLA KOLEJNEGO GRACZA
            this.playerWithMove = this.players.nextPlayer(this.playerWithMove);

            return this;
        }
        
        // SPRAWDZENIE CZY GRACZ MOŻE WYKONAĆ TAKI RUCH
        if(!Roules.isMove(card, this.history.getLast()))
            throw new Error("Wrong move");

        const mustSkip  = this.skipDisplay.isSkip(card, this.history.getLast(), this.players.indexOf(player));
        const mustThrow = this.throwDisplay.isThrow(card, this.history.getLast());

        // Jeśli gracz musi skipować to nie wykonuje ruchu
        if(!( mustSkip || mustThrow)) {
            const popCard = this.players.popCard(player, card);

            if(!popCard)
                throw new Error('Player not have this card');
            
            // DODANIE NA STOS RUCHU
            this.history.push({
                card: card,
                playerID: player
            });

            if(!this.players.countCard(player))
                this.winner = player;
        } 
        else {
            // GRACZ WYCIĄGA KARTĘ
            const cards = this.deck.throwCard(this.throwDisplay.getThrowCard());
            this.players.pushCards(player, cards);
        }

        // USTAWIENIE SKIPA DLA KOLEJNEGO GRACZA JESLI WYMAGA OD TEGO ROZGRYWAKA
        this.skipDisplay.setSkip(this.players, this.players.indexOf(player), card);

        // USTAWIENIE WYCIĄGANIA KARD JESLI WYMAGA OD TEGO ROZGRYWAKA
        this.throwDisplay.setThrow(card);

        // USTAWINIE RUCHU DLA KOLEJNEGO GRACZA
        this.playerWithMove = this.players.nextPlayer(this.playerWithMove);

        return this;
    }

    // POBRANIE STANU GRY
    get(player: number) {

        // sprawdzenie czy gra wystartowała
        if(!this.players || !this.deck)
            throw new Error('Game not started');

        return {
            winner: this.winner,
            playerWithMove: this.playerWithMove,
            move: this.history.get(),
            hand: this.players.getMyHand(player),
            player: this.players.getOtherPlayers(player)
        }
    }
}