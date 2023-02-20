import ApiBase from "./ApiBase";

export default class ApiPlayer extends ApiBase {

    constructor() {
        super('/player');
    }

    async newPlayer(name: string) {
        return await this.instance.post('/new', {
            "name": name
        });
    }
}