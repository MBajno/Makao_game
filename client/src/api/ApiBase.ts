import axios from 'axios'

export class Token {
    public static INSTANCE: string;

    public static set(token: string) {
        Token.INSTANCE = `Bearer ${token}`
    }
}

export default class ApiBase {

    protected instance;

    constructor(url: string | undefined) {

        let URL = 'http://localhost:4000'

        if(url)
            URL += url

        this.instance = axios.create({
            baseURL: URL
        });
    }
}