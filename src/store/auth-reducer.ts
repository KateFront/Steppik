import {createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit";
import {authAPI, ForgotPasswordType, NewPasswordType} from "../api/auth-api";
import {setAppMyUserIdAC, setAppStatusAC} from "./app-reducer";

const initialState = {
    isLoggedIn: false,
    error: '',
    isRegistered: false,
    isForgot: false,
    isNewPassword: false
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
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        authAPI.login(data)
            .then((res) => {
                if (res.statusText === "OK") {
                    dispatch(setIsLoggedInAC({value: true}))
                    dispatch(setAppMyUserIdAC({myUserID: ''}))
                }
            })
            .catch((e) => {
                const error = e.response.data.error
                dispatch(setIsLoggedInAC(error))
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
        authAPI.delete()
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
    authAPI.register(data)
        .then((res) => {
            if (res.statusText === "Created") {
                dispatch(setIsRegisteredAC({value: true}))
            }
        })
        .catch((e) => {
            const error = e.response.data.error
            dispatch(setIsRegisteredAC({value: false}))
            setTimeout(() => dispatch(setAuthErrorAC({error})), 5000);

        })
        .finally(() => {
                dispatch(setAppStatusAC({status: 'succeeded'}))
            }
        )
}

export const forgotPasswordTC = (data: ForgotPasswordType) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        authAPI.forgotPassword(data)
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
        authAPI.setNewPassword(data)
            .then(()=>{
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

