export class SocketConnecting {
    static readonly type = '[Socket] Reconnecting';
}

export class SocketConnected {
    static readonly type = '[Socket] Connected';
    constructor(public connectionId: string) { }
}
