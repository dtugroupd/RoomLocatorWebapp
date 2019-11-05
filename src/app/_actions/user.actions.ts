import { User, Token } from '../models/login/user.model';

/**
 * @author Hadi Horani, s144885
 */

export class SetToken {
    static readonly type = '[Token] Set';

    constructor(public payload: Token) {}
}

