import Socket from "@socket/index";

export default interface PlayerTypeProvider {
    socket: Socket,
    player: string,
    register: (id: number, name: string, password: string) => Promise<string>,
    token: string
}