import Symbols from "./enum/symbols";
import Hand from "./types/hand";

export default class Players {

    players: Array<Hand>;

    constructor(players: Array<number>) {
        this.players = new Array<Hand>();   
        this.init(players);
    }

    // TWORZENIE GRACZY
    init(players: Array<number>) {
        players.forEach((player : number) => {
            this.players.push({
                playerID: player,
                cards: new Array<Symbols>()
            });
        });
    }

    private findPlayer(player: number | null, it: number | undefined = undefined) {

        if(player)
            return this.players.find((hand: Hand) => hand.playerID == player);

        if(it === undefined)
            return undefined;
        
        if(it >= 0 && it < this.players.length)
            return this.players[it];

        return undefined;
    }

    pushCard(player: number | null, card: Symbols, it: number | undefined = undefined) {
        
        const hand = this.findPlayer(player, it);
        
        if(!hand)
            return undefined;

        hand.cards.push(card);

        return hand;
    }

    pushCards(player: number | null, cards: Array<Symbols>, it: number | undefined = undefined) {
        
        const hand = this.findPlayer(player, it);
        
        if(!hand)
            return undefined;

        cards.forEach((card:Symbols) => hand.cards.push(card));

        return hand;
    }

    private checkCard(hand: Hand, card: Symbols) {
        return hand.cards.find((c: Symbols) => card == c) ? true : false
    }

    countCard(player: number | null, it: number | undefined = undefined) {
        const hand = this.findPlayer(player, it);
        
        if(!hand)
            return undefined;

        return hand.cards.length;
    }

    popCard(player: number | null, card: Symbols, it: number | undefined = undefined) {
        const hand = this.findPlayer(player, it);
        
        if(!hand)
            return undefined;

        // SPRAWDZENIE CZY GRACZ MA KARTY
        if(!this.checkCard(hand, card))
            return undefined;

        // WUSZUKANIE INDEKSU KARTY
        const index = hand.cards.indexOf(card);

        return hand.cards.splice(index, 1);
    }

    deal(cards: Array<Symbols>) {
        let it = 0;
        cards.forEach((card: Symbols) => {
            const hand = this.findPlayer(null, it);
        
            if(hand)
                hand.cards.push(card);

            it = this.nextPlayer(it);
        });
    }

    indexOf(player: number) {
        const hand = this.findPlayer(player);

        if(!hand)
            return undefined;

        return this.players.indexOf(hand);
    }

    nextPlayer(it: number) {
        it++; 
        return it % this.countPlayer();
    }

    prePlayer(it: number) {
        it--; 
        if(it < 0) 
            it += this.countPlayer();
        return it;
    }

    countPlayer() {
        return this.players.length;
    }

    getMyHand(player: number) {
        let hand = null;
        this.players.forEach((h: Hand) => {
            if(h.playerID == player) {
                hand = {
                    cards: h.cards
                }
            }
        });

        return hand;
    }

    getOtherPlayers(player: number) {
        const otherPlayer = new Array<any>();
        this.players.forEach((h: Hand) => {
            if(h.playerID != player) {
                otherPlayer.push({
                    cards: h.cards.length,
                    playerID: h.playerID
                })
            }
        });
        return otherPlayer;
    }
}