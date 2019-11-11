/**
 * @author Hadi Horani, s144885
 */

export interface User {
    studentId: string;
    roles: string[];
}

export interface Token {
    user: User;
    token: string;
}