import Chat     from "./Chat";
import Game     from "./Game";
import Room, { PlayerReady }     from "./types/Room";

const MAX_SIZE_ROOM = 2;

export class Rooms {
    private static instance: Rooms;

    private rooms: Array<Room>;

    private constructor() {
        this.rooms = new Array<Room>();
    }

    static getInsatance(): Rooms {
        if(!this.instance) {
            this.instance = new Rooms();
        }
        return this.instance;
    }

    // ZNALEŹIENIE POKOJU
    private findRoom(name: string) {
        return this.rooms.find( room => room.name == name);
    }

    // PRZESZUKANIE POKOI I POŹNIEJSZA EDYCJA
    private editRoom(name: string, then: (objRoom: Room) => void) {

        const objRoom = this.findRoom(name);

        if(!objRoom) {
            throw new Error('Not found room search by name');
        }

        then(objRoom);
    }

    // TWORZENIE NOWEGO POKUJU
    newRoom(name: string, playerID: number) {

        // Sprawdzenie czy gracz nalerzy już do jakiegoś pokoju
        if(this.rooms.find( room => room.players.find(player => player.playerID == playerID))) 
            throw new Error("")

        // SPRAWDZENIE CZY POKUJ ISTNIEJE
        if(this.findRoom(name)) {
            this.joinRoom(name, playerID);
            return this;
        }

        // DODANIE NOWEGO POJOJU
        this.rooms.push({
            name: name,
            players: [{
                playerID: playerID,
                ready: false
            }],
            chat: new Chat(),
            game: new Game()
        })

        return this;
    }

    // DOŁĄCZANIE DO POKOJU
    joinRoom(name: string, playerID: number) {

        // PRZESZUKANIE POKOI
        this.editRoom(name, objRoom => {
            
            // TODO: fajnie by było aby można byłoby dodawać limity przy tworzeniu pokoju
            if(objRoom.players.length >= MAX_SIZE_ROOM) {
                throw new Error('This room has limit');
            }

            // SPRAWDZENIE CZY GRA WYSTARTOWAŁA 
            if(this.isReady(name)) 
                throw new Error("Game started");
    
            objRoom.players.push({
                playerID: playerID,
                ready: false
            });
        });

        return this;
    }

    // POBRANIE OBIEKTU CHATU W CELU ZARZĄDZANIA NIM 
    getChat(name: string, playerID: number) {
        
        let temp = new Chat();
        // PRZESZUKANIE POKOI
        this.editRoom(name, objRoom => {
            
            // SPRAWDZENIE CZY GRACZ DOŁĄCZYŁ DO POKOJU
            if(!objRoom.players.find((p: PlayerReady) => p.playerID === playerID)) {
                throw new Error('Player not join this room');
            }

            // ZWRÓCENIE OBIEKTU CHAT
            temp = objRoom.chat;
        });

        return temp;
    }

    // POBRANIE OBIEKTU GRA W CELU ZARZĄDZANIA ROZGRYWKĄ W POKOJU
    getGame(name: string, playerID: number) {

        let temp = new Game();
        // PRZESZUKANIE POKOI
        this.editRoom(name, objRoom => {
            
            // SPRAWDZENIE CZY GRACZ DOŁĄCZYŁ DO POKOJU
            if(!objRoom.players.find((p: PlayerReady) => p.playerID === playerID)) {
                throw new Error('Player not join this room');
            }

            // ZWRÓCENIE OBIEKTU GRY
            temp = objRoom.game;

        });

        return temp;
    }

    getPlayers(name: string, playerID: number) {

        let temp: Array<number> = [];
        // PRZESZUKANIE POKOI
        this.editRoom(name, objRoom => {
            
            // SPRAWDZENIE CZY GRACZ DOŁĄCZYŁ DO POKOJU
            if(!objRoom.players.find((p: PlayerReady) => p.playerID === playerID)) {
                throw new Error('Player not join this room');
            }

            // ZWRÓCENIE OBIEKTU GRY
            temp = objRoom.players.map(p => p.playerID);

        });

        return temp;
    }

    // POBRANIE LISTY NAZW POKOI
    getRooms() {
        return this.rooms.map(room => {
            return {
                name: room.name
            }
        });
    }

    isReady(name: string) {

        let ready: boolean = true;

        this.editRoom(name, objRoom => { 
            
            if(objRoom.players.length < 2) {
                ready = false;
            }
            
            let result: boolean = false;
            objRoom.players.forEach((p: PlayerReady) => {
                if(!p.ready) {
                    result = true;
                }
            });

            if(result)
                ready = false;
        });

        return ready;
    }

    ready(name: string, playerID: number) {
        
        this.editRoom(name, objRoom => { 

            const player = objRoom.players.find((p: PlayerReady) => p.playerID === playerID);

            // SPRAWDZENIE CZY GRACZ DOŁĄCZYŁ DO POKOJU
            if(!player) {
                throw new Error('Player not join this room');
            }

            player.ready = true;

        });
    }

    // TODO: Sprawdzić do czego miało to służyć jak do niczego to wywalić
    result(name: string) {
        const objRoom = this.findRoom(name);

        if(!objRoom) {
            throw new Error('Not found room search by name');
        }

        // TODO: trochę to przerobić bez wysyłąnia funkcj lambda i pewnie jak będzie klasa game to też nie jako klase a jako liste ruchó wysyłąć
        return objRoom;
    }
}