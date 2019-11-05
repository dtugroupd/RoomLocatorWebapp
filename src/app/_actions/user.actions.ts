import { User } from '../models/login/user.model';

/**
 * @author Hadi Horani, s144885
 */

export class GetUser {
    static readonly type = '[User] Get';
}

export class SetUser {
    static readonly type = '[User] Set';

    constructor(public payload: User) {}
}

