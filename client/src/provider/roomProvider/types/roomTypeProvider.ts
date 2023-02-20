
export default interface RoomTypeProvider {
    /** LISTA WIADOMOŚCI */
    message: any,
    /** POBRANIE WIADOMOŚCI */
    fetchMessage: (room: string, token: string) => void,
    /** KARTY GRACZA */
    myHand: any, 
    /** INFORMACJIE O ILOSCI KARD U GRACZY */
    otherPlayerCard: any,
    /** HISTORIA RUCHÓW W GRZE */ 
    moves: Array<any>,
    /** INFORAMCJA NA TEMAT GRY CZYJ RUCH/ZWYCIESTWO */
    info: string
    /** POBRANIE GRY */ 
    fetchGame: (room: string, token: string) => void,
    /** ID POKOJU */ 
    room: any,
    /** DOŁĄCZENIE DO GRY */ 
    joinRoom: (room: string, player: string) => Promise<string>,
    /** ID POKOJU */ 
    listRooms: Array<any>,
    /** POBRANIE LISTY POKOI */ 
    fetchListRoom: () => Promise<boolean>,
    /** STATUS GRY */
    statusGame: any,
    /** POBIERANIE STATUSU GRY */
    fetchGameStatus: (room: string, token: string) => Promise<boolean>,
}