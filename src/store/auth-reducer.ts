import {createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit";
import {authApi, ForgotPasswordType, NewPasswordType} from "../api/authApi";
import {setAppMyUserIdAC, setAppStatusAC} from "./app-reducer";

type initialStateType = {
    isLoggedIn: boolean,
    error: string,
    isRegistered: boolean,
    isForgot: boolean,
    isNewPassword: boolean,
};

const initialState: initialStateType = {
    isLoggedIn: false,
    error: '',
    isRegistered: false,
    isForgot: false,
    isNewPassword: false,

};

const slice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setIsLoggedInAC(state, action: PayloadAction<{ value: boolean }>) {
            state.isLoggedIn = action.payload.value;
        },
        setAuthErrorAC(state, action: PayloadAction<{ error: string }>) {
            state.error = action.payload.error
        },
        setIsRegisteredAC(state, action: PayloadAction<{ value: boolean }>) {
            state.isRegistered = action.payload.value;
        },
        setIsForgotAC(state, action: PayloadAction<{ value: boolean }>) {
            state.isForgot = action.payload.value
        },
        setIsNewPassword(state, action: PayloadAction<{ value: boolean }>) {
            state.isNewPassword = action.payload.value
        }
    }
});

export const authReducer = slice.reducer;

export const {setIsLoggedInAC, setAuthErrorAC, setIsRegisteredAC, setIsForgotAC, setIsNewPassword} = slice.actions;


export const loginTC = (data: LoginParamsType) => {
    console.log('loginTC')
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        authApi.login(data)
            .then((res) => {
                if (res.statusText === "OK") {
                    console.log('ThunkSuccess')
                    dispatch(setIsLoggedInAC({value: true}));
                    dispatch(setAppMyUserIdAC({myUserID: res.data._id}))
                }
            })
            .catch((e) => {
                console.log('ThunkError')
                const error = e.response.data.error;
                dispatch(setIsLoggedInAC({value: false}));
                dispatch(setAuthErrorAC({error}));
                setTimeout(() => dispatch(setAuthErrorAC({error: ''})), 5000);
            })
            .finally(() => {
                    dispatch(setAppStatusAC({status: 'succeeded'}))
                }
            )
    }
}
export const logoutTC = () => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        authApi.delete()
            .then((res) => {
                if (res.statusText === "OK") {
                    dispatch(setIsLoggedInAC({value: false}))
                    dispatch(setAppMyUserIdAC({myUserID: ''}))
                }
            })
            .finally(() => {
                    dispatch(setAppStatusAC({status: 'succeeded'}))
                }
            )
    }
}
export const registerTC = (data: SignUpParamsType) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    authApi.register(data)
        .then((res) => {
            if (res.statusText === "Created") {
                dispatch(setIsRegisteredAC({value: true}))
            }
        })
        .catch((e) => {
            const error = e.response.data.error
            dispatch(setIsRegisteredAC({value: false}))
            dispatch(setAuthErrorAC({error}));
            setTimeout(() => dispatch(setAuthErrorAC({error: ''})), 5000);

        })
        .finally(() => {
                dispatch(setAppStatusAC({status: 'succeeded'}))
            }
        )
}

export const forgotPasswordTC = (data: ForgotPasswordType) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        authApi.forgotPassword(data)
            .then((res) => {
                if (res.statusText === "Created") {
                    dispatch(setIsForgotAC({value: true}))
                }
            })
            .catch((e) => {
                const error = e.response.data.error;
                dispatch(setAuthErrorAC({error}))
            })
            .finally(() => {
                dispatch(setAppStatusAC({status: 'succeeded'}))
            })
    }
}

export const newPasswordTC = (data: NewPasswordType) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        authApi.setNewPassword(data)
            .then(() => {
                dispatch(setIsNewPassword({value: true}))
            })
            .catch((e) => {
                const error = e.response.data.error;
                dispatch(setAuthErrorAC({error}))
            })
            .finally(() => {
                dispatch(setAppStatusAC({status: 'succeeded'}))
            })
    }
}

export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
}
export type SignUpParamsType = {
    email: string
    password: string
    confirmPassword: string
}

