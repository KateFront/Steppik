import axios, {AxiosResponse} from 'axios';
import {SignUpParamsType} from "../store/auth-reducer";
import {auth} from "./app_instances";
import {UserProfileType} from "./types";


export const authApi = {
    login(data: LoginType) {
        return auth.post<LoginType, ResponseType<UserProfileType>>(`/login`, data);
    },
    register(data: SignUpParamsType) {
        return auth.post<SignUpParamsType, ResponseType<ResponseType>>(`/register`, data);
    },
    me() {
        return auth.post<unknown, ResponseType<UserProfileType>>(`/me`);
    },
    forgotPassword(data: ForgotPasswordType) {
        return auth.post<ForgotPasswordType, ResponseType<ResponseType>>(`/forgot`, {
            email: data.email,
            "from": "test-front-admin <ai73a@yandex.by>",
            "message": "<div style= 'background-color: #b8b8b8; padding: 15px'> " +
                "password recovery link: <a href='http://localhost:3000/createPassword/$token$'> " +
                "Click the link to restore access to your account " +
                "</a>" +
                "</div>"
        });
    },
    setNewPassword(data: NewPasswordType) {
        return auth.post(`/set-new-password`, data);
    },
    delete() {
        return auth.delete(`/me`);
    }
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

export type ResponseType<D = {}> = {
    status: number
    statusText: string
    data: D
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
