/**
 * @author Hadi Horani, s144885
 * @author Anders Wiberg Olsen, s165241
 */

export class LoginModel {
    username: string;
    password: string;
    hasAcceptedDisclaimer?: boolean;
}

export interface AuthenticatedModel {
    user: User;
    token: string;
}

export interface User {
    id: string;
    studentId: string;
    firstName: string;
    lastName: string;
    fullName: string;
    roles: Role[];
    profileImage: string;
    isGeneralAdmin: boolean;
}

export interface Role {
    name: string;
    locationId: string;
}
export interface UserDisclaimer {
    hasAcceptedDisclaimer?: boolean;
}
