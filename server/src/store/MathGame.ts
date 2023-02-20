import Symbols from "./enum/symbols";


export default class MathGame {

    private static queen: Array<Symbols> = [
        Symbols["♠_QQ"], 
        Symbols["♣_QQ"], 
        Symbols["♥_QQ"], 
        Symbols["♦_QQ"]
    ]

    private static four: Array<Symbols> = [
        Symbols["♠_04"],
        Symbols["♣_04"],
        Symbols["♥_04"],
        Symbols["♦_04"]
    ]

    private static tree: Array<Symbols> = [
        Symbols["♠_03"],
        Symbols["♣_03"],
        Symbols["♥_03"],
        Symbols["♦_03"]
    ]

    private static two: Array<Symbols> = [
        Symbols["♠_02"],
        Symbols["♣_02"],
        Symbols["♥_02"],
        Symbols["♦_02"]
    ]

    private static find(el: Symbols,  arr: Array<Symbols>) {
        return arr.find((obj: Symbols) => el == obj) ? true : false;
    }

    static isTwo(el: Symbols) {
        return MathGame.find(el, MathGame.two);
    }

    static isTree(el: Symbols) {
        return MathGame.find(el, MathGame.tree);
    }
    
    static isFour(el: Symbols) {
        return MathGame.find(el, MathGame.four);
    }
    
    static isQueen(el: Symbols) {
        return MathGame.find(el, MathGame.queen);
    }

    static findColor(el: Symbols) {
        return Math.floor((el - 1) / 13);
    }

    static findType(el: Symbols) {
        return (el - 1) % 13;
    }

    static sameColor(a: Symbols, b: Symbols) {
        return MathGame.findColor(a) == MathGame.findColor(b);
    }

    static sameType(a: Symbols, b: Symbols) {
        return MathGame.findType(a) == MathGame.findType(b);
    }

    static isTheSame(a: Symbols, b: Symbols) {
        return a == b
    }

    static inArray(el: Symbols, arr: Array<Symbols>) {
        return MathGame.find(el, arr);
    }
}