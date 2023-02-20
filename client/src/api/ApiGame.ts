import Symbols from "@components/Card/types/Symbols";
import ApiBase from "./ApiBase";

export default class ApiGame extends ApiBase {

    constructor() {
        super('/game');
    }

    async moves(room: string, token: string) {
        return await this.instance.get(`/${room}`, {
            headers: {
                "x-access-token": token
            }
        });
    }

    async move(room: string, card: Symbols, token: string) {
        return await this.instance.post(`/${room}`, {
            "card": card,
        },{
            headers: {
                "x-access-token": token
            }
        });
    }

    async skip(room: string, token: string) {
        return await this.instance.post(`/${room}/skip`, {}, {
            headers: {
                "x-access-token": token
            }
        });
    }
}