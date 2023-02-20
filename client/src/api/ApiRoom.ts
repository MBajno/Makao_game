import ApiBase from "./ApiBase";

export default class ApiRoom extends ApiBase {

    constructor() {
        super('/room');
    }

    async get() {
        return await this.instance.get('/');
    }

    async newRoom(name: string, player: string) {
        return await this.instance.post('/new', {
            "name": name,
            "player": player
        });
    }

    async joinRoom(name: string, token: string) {
        return await this.instance.post('/join', {
            "name": name,
            "token": token
        });
    }

    async ready(room: string, token: string) {
        return await this.instance.post(`/${room}/ready`, {}, {
            headers: {
                "x-access-token": token
            }
        });
    }

    async isReady(room: string, token: string) {
        return await this.instance.get(`/${room}/ready`, {
            headers: {
                "x-access-token": token
            }
        });
    }
}