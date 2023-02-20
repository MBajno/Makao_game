import Player from "./types/Player";

export default class Users {
    private static instance: Users;

    users: Array<Player>;

    private constructor() {
        this.users = new Array<Player>();
    }

    static getInsatance(): Users {
        if(!this.instance) {
            this.instance = new Users();
        }
        return this.instance;
    }

    // DODAJ GRACZA
    set(id: number, name: string, password: string) {

        const objPlayer = this.findByName(name);

        if (objPlayer) {
            throw new Error('This player exist');
        }

        this.users.push({
            id,
            name,
            password
        });

        return this;
    }

    // POBIERZ OBIEKT GRACZA PO NAZWIE
    getByName(name: string) {

        const objPlayer = this.findByName(name);

        if (!objPlayer) {
            throw new Error('This player not exist');
        }

        return objPlayer;
    }

    // POBIERZ OBIEKT GRACZA PO ID
    getByID(id: number) {

        const objPlayer = this.findById(id);

        if (!objPlayer) {
            throw new Error('This player not exist');
        }

        return objPlayer;
    }

    // ZNAJDZ PO NAZWIE
    private findByName(name: string) {
        return this.users.find(player => player.name == name);
    }

    //ZNAJDZ PO ID
    private findById(id: number) {
        return this.users.find(player => player.id == id);
    }

    // POBRANIE LISTY GRACZY
    getAll() {
        return this.users.map((player: Player) => {
            return {
                id: player.id,
                name: player.name
            }
        });
    }

    // DODAJ SOCKET
    addSocket(name: string, socket: any) {
        const objPlayer = this.findByName(name);

        if (!objPlayer) {
            throw new Error('This player not exist');
        }

        objPlayer.socket = socket;

        return this;
    }

    // WYSŁANIE POWIDOMIEN DO GRACZY
    sendInfoSocket(id: number) {
        const objPlayer = this.findById(id);

        if (!objPlayer) {
            throw new Error('This player not exist');
        }
        
        objPlayer.socket();
        
        return this;
    }

    // ZMIANA NAZWY GRACZA
    setName(_id: number, _name: string) {
        // TODO: TRZEBA ZAIMPLEMENTOWAĆ 
    }
}