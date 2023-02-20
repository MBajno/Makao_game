import ApiBase from "./ApiBase";

export default class ApiAuth extends ApiBase {

    constructor() {
        super('/auth');
    }

    async register(id: number, name: string, password: string) {
        return await this.instance.post('/register', {
            "id": id, 
            "name": name, 
            "password": password
        });
    }

    async login(id: number, password: string) {
        return await this.instance.post('/login', {
            "id": id, 
            "password": password
        });
    }
}