/**
 * @author Hadi Horani, s144885
 * @author Anders Wiberg Olsen, s165241
 */


export class SetToken {
    static readonly type = '[Token] Set';

    constructor(public payload: string) {}
}

export class GetUser {
    static readonly type = '[User] Get';
}

export class SetAcceptedDisclaimer {
    constructor(public studentId: string) {}
    static readonly type = '[User Disclaimer] Set Accept';
}

export class DeleteUser {
    constructor(public studentId: string) {}
    static readonly type = '[User] Delete';
}

export class DeleteMe {
    static readonly type = '[Me] Delete';
}




