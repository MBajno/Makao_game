import Symbols from "./enum/symbols";



export default class Deck {

    private deck: Array<Symbols>;

    constructor() {
        this.deck = new Array<Symbols>();
        const deck = new Array<any>();   
        this.init(deck);
        this.sort(deck);
        this.build(deck);
    }

    result() {
        return this.deck;
    } 

    // STWORZENIE DEKU Z NUMEREM RANDOM POTRZEBNYM DO POSORTOWANIA
    private init(deck: Array<any>) {
        for(let it = 1; it < 53; it++) {
            deck.push({
                it: it,
                random: Math.random() * 10000
            });
        }
    }

    // SORTOWANIE DECKU
    private sort(deck: Array<any>) {
        deck.sort((a, b) => {
            
            if (a.random > b.random) {
                return 1;
            }
    
            if (a.random < b.random) {
                return -1;
            }
    
            return 0;
        });
    }

    // WPISANIE POSORTOWANEGO DECKU
    private build(deck: Array<any>) {
        deck.forEach((d: any)=> {
            this.deck.push(d.it);
        });
    }

    // WYCIĄGNIĘCIE KARTY Z DEKU
    throwCard(count: number = 1) {

        const cards = Array<Symbols>(); 

        for(let i = 0; i < count; i++) {

            const card = this.deck.pop();
            card && cards.push(card);

        }

        return cards;
        
    }
}