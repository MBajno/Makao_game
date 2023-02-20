import ApiBase from "./ApiBase";

export default class ApiChat extends ApiBase {

    constructor() {
        super('/chat');
    }

    async sendMessage(room: string, message: string, token: string) {
        return await this.instance.post(`/${room}`, {
            "message": message
        },{
            headers: {
                "x-access-token": token
            }
        });
    }

    async message(room: string, token: string) {
        return await this.instance.get(`/${room}`, {
            headers: {
                "x-access-token": token
            }
        });
    }
}