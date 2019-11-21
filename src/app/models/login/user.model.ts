/**
 * @author Hadi Horani, s144885
 */

export interface LoginModel {
    studentId: string;
    password: string;
}

export interface User {
    id: string;
    studentId: string;
    roles: string[];
    name: string;
    profile: string;
}

export interface Token {
    token: string;
}