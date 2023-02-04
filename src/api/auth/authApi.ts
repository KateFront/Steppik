import { SignUpParamsType } from '../../store/auth-reducer';
import { auth } from '../axios_instances';
import { ForgotPasswordType, LoginType, NewPasswordType, UserProfileType } from './typesAuth';

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
            from: 'test-front-admin <ai73a@yandex.by>',
            message:
                "<div style= 'background-color: #b8b8b8; padding: 15px'> " +
                "password recovery link: <a href='http://localhost:3000/createPassword/$token$'> " +
                'Click the link to restore access to your account ' +
                '</a>' +
                '</div>',
        });
    },
    setNewPassword(data: NewPasswordType) {
        return auth.post(`/set-new-password`, data);
    },
    delete() {
        return auth.delete(`/me`);
    },
};

export type ResponseType<D = unknown> = {
    status: number;
    statusText: string;
    data: D;
};
