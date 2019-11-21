import { User } from '../models/login/user.model';

/**
 * @author Hadi Horani, s144885
 */


export class GetUsers {
    static readonly type = '[Users] Get';
}

export class UpdateRole {
    static readonly type = '[Role] Update';
    constructor(public id: string, public roleName: string) {}

}
