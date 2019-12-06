import { LoginModel, User } from '../models/login/user.model';
import { ErrorModel } from '../models/general/error.model';

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

export class FetchUser {
    static readonly type = '[Token] Fetch User';
}

export class FetchUserSuccess {
    static readonly type = '[Token] Fetch User Success';
    constructor(public user: User) { }
}

export class FetchUserError {
    static readonly type = '[Token] Fetch User Failed';
    constructor(public error: ErrorModel) { }
}

export class SetIsLoading {
    static readonly type = '[IsLoading] Set';
    constructor(public payload: boolean) { }
}

export class LoginSuccess {
    static readonly type = '[Login] Success';
}

export class LoginError {
    static readonly type = '[Login] Error';
    constructor(public payload: ErrorModel) { }
}

export class Logout {
    static readonly type = '[Token] Logout';
}

