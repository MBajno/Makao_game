export default class Log {

    static Error(err: string, path: string | null) {
        console.log(`[ERROR]: ${err}`);
        console.log(`[PATH]:  ${path}`);
    }

    static Debug(err: string, path: string | null, info: string | null) {
        console.log(`[Error]: ${err}`);
        console.log(`[PATH]:  ${path}`);
        console.log(`[Info]:  ${info}`);
    }
}