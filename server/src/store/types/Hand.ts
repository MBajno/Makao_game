import Symbols from "../enum/symbols";

export default interface Hand {
    playerID: number,
    cards: Array<Symbols>
}