import { LoginModel } from '../models/login/user.model';

/**
 * @author Hadi Horani, s144885
 * @author Anders Wiberg Olsen, s165241
 */

export class Login {
    static readonly type = '[Token] Login';
    constructor(public loginModel: LoginModel) { }
}

export class SetTokenAndUser {
    static readonly type = '[Token] SetTokenAndUser';
}
