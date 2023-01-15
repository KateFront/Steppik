import {createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit";
import {authAPI} from "../../../api/auth-api";
import {setAppMyUserIdAC, setAppStatusAC} from "../../../app/app-reducer";


const initialState = {
    isLoggedIn: false,
    error: ''
};

const slice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setIsLoggedInAC(state, action: PayloadAction<{value: boolean}>) {
            state.isLoggedIn = action.payload.value;
        },
        setLoginErrorAC(state, action: PayloadAction<{error: string}>) {
            state.error = action.payload.error
        }
    }
});

export const authReducer = slice.reducer;


export const {setIsLoggedInAC, setLoginErrorAC} = slice.actions;

export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    authAPI.login(data)
        .then((res) => {
            if (res.statusText === "OK") {
                dispatch(setIsLoggedInAC({value: true}))
                dispatch(setAppMyUserIdAC( { myUserID: ''}))
            }
        })
        .catch((e) => {
            const error = e.response.data.error
            dispatch(setIsLoggedInAC(error))
            setTimeout(() => dispatch(setLoginErrorAC({ error: ''})), 5000);

        })
        .finally(() => {
                dispatch(setAppStatusAC({status: 'succeeded'}))
            }
        )
}

export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}