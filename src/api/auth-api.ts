import axios, {AxiosResponse} from 'axios';

const instance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0',
    withCredentials: true
})

export const authAPI = {
    login(data: LoginType) {
        return instance.post<LoginType, AxiosResponse<ResponseType<{ userId: number }>>>(`/auth/login`, data);
    },
    ping(){
        return instance.get<PingType>(`/ping`);
    },
    register(data: LoginType){
        return instance.post<LoginType, AxiosResponse<ResponseType<{ userId: number }>>>(`/auth/register`, data);
    },
    me(){
        return instance.post<ResponseType<UserType>>(`/auth/me`);
    },
    forgot(){
        return instance.post(`/auth/forgot`);
    }
}
export type UserType = {
    id: string
    email: string
    login: string
}
export type LoginType = {
    email: string
    password: string
    rememberMe?: boolean
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
