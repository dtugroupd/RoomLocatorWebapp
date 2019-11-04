/**
 * @author Hadi Horani, s165242
 */

import { LoginToken } from '../models/login/login.model';

export class AddToken {
    static readonly type = '[Login] Add';

    constructor(public payload: LoginToken) {}
}
