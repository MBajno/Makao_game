import Chat     from "../Chat";
import Game     from "../Game";

export interface PlayerReady {
    playerID: number,
    ready: boolean
}

export default interface Room {
    name: string,
    players: Array<PlayerReady>,
    chat: Chat,
    game: Game
}