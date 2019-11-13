/**
 * @author Hadi Horani, s144885
 */

import { Token } from '../models/login/user.model';


export class SetToken {
    static readonly type = '[Token] Set';

    constructor(public payload: Token) {}
}
