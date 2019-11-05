/**
 * @author Hadi Horani, s165242
 */

export class GetUser {
    static readonly type = '[User] Get';
}

export class SetUser {
    static readonly type = '[User] Set';

    constructor(public payload: any) {}
}

