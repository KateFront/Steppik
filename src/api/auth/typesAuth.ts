export type UserProfileType = {
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount: number; // количество колод

    created: Date;
    updated: Date;
    isAdmin: boolean;
    verified: boolean; // подтвердил ли почту
    rememberMe: boolean;

    error?: string;
}

export type NewPasswordType = {
    password: string
    resetPasswordToken: string
}

export enum Result_code {
    OK = 0,
    ERROR = 1,
    CAPTCHA = 10
}


export type LoginType = {
    email: string
    password: string
    rememberMe: boolean
}


export type PingType = {
    ping: number,
    backTime: number
    frontTime: number
    info: string
}

export type ForgotPasswordType = {
    email: string
}
