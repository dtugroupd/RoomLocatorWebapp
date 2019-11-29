import { User } from '../models/login/user.model';

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
