/**
 * @author Hadi Horani, s144885
 */

import { User, Token } from '../models/login/user.model';

export class SetToken {
    static readonly type = '[Token] Set';

    constructor(public payload: Token) {}
}

export class GetUser {
    static readonly type = '[User] Get';
}
