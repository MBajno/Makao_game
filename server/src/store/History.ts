import Move from "./types/Move";

export default class History {

    // HISTORIA RUCHÓW
    private move: Array<Move>;

    constructor() {
        this.move = new Array<Move>();
    }

    getLast() {

        if(this.move.length == 0)
            return undefined;

        return this.move[this.move.length - 1].card; 
    }

    push(move: Move) {
        this.move.push(move);
    }

    get() {
        return this.move;
    }
}