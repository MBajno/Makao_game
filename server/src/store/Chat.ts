import Message from "./types/Message";

export default class Chat {

    private message: Array<Message>;

    constructor() {
        this.message = new Array<Message>();
    }

    // DODANIE WIADOMOŚCI DO CHAT
    add(message: Message) {
        
        this.message.push(message);
        
        return this;
    }

    // POBRANIE WIADOMOŚCI
    get() {
        return this.message;
    }

}