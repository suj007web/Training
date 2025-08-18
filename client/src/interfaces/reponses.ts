import { User } from "./interfaces";

export interface APIResponse<T>{
    status: 'success' | 'error';
    message?: string;
    data?: T;
    error?: string;
}


export interface LoginData {
    user : Partial<User>;
    accessToken: string;
    refreshToken: string;
}


