import axios, {AxiosResponse} from 'axios';
import {SignUpParamsType} from "../store/auth-reducer";

const instance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0',
    withCredentials: true
})

export const authAPI = {
    login(data: LoginType) {
        return instance.post<LoginType, AxiosResponse<ResponseType<{ userId: number }>>>(`/auth/login`, data);
    },
    register(data: SignUpParamsType){
        return instance.post<SignUpParamsType, AxiosResponse<ResponseType<{ userId: number }>>>(`/auth/register`, data);
    },
    me(){
        return instance.post<ResponseType<UserType>>(`/auth/me`);
    },
    forgotPassword(data: ForgotPasswordType){
        return instance.post<ForgotPasswordType, AxiosResponse<ResponseType>>(`/auth/forgot`, {
            email: data.email,
            "from": "test-front-admin <ai73a@yandex.by>",
            "message": "<div style= 'background-color: #b8b8b8; padding: 15px'> " +
                "password recovery link: <a href='http://localhost:3000/createPassword/$token$'> " +
                "Click the link to restore access to your account " +
                "</a>" +
                "</div>"
        });
    },
    setNewPassword(data: NewPasswordType){
        return instance.post(`/auth/set-new-password`, data);
    },
    delete(){
        return instance.delete(`/auth/me`);
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
export type UserType = {
    id: string
    email: string
    login: string
}
export type LoginType = {
    email: string
    password: string
    rememberMe: boolean
}

export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
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
