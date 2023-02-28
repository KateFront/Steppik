import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import { authApi } from '../api/auth/authApi';
import { setIsLoggedInAC } from './auth-reducer';

type ProfileType = {
    nickName: string;
    avatar?: string;
    id: string;
    email: string;
};

type InitialStateType = {
    isInitialized: boolean;
    status: RequestStatusType;
    error: string | null;
    profile: ProfileType | null;
};
const initialState: InitialStateType = {
    isInitialized: false,
    status: 'idle',
    error: null,
    profile: null,
};

const slice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setIsInitializedAC(state, action: PayloadAction<{ value: boolean }>) {
            state.isInitialized = action.payload.value;
        },
        setAppStatusAC(state, action: PayloadAction<{ status: RequestStatusType }>) {
            state.status = action.payload.status;
        },
        setAppErrorAC(state, action: PayloadAction<{ error: string }>) {
            state.error = action.payload.error;
        },
        setProfileAC(state, action: PayloadAction<{ value: ProfileType | null }>) {
            state.profile = action.payload.value;
        },
    },
});

export const appReducer = slice.reducer;
export const { setIsInitializedAC, setAppStatusAC, setProfileAC } = slice.actions;

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

export const initializeAppTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({ status: 'loading' }));
    authApi
        .me()
        .then((res) => {
            dispatch(setAppStatusAC({ status: 'succeeded' }));
            dispatch(setIsLoggedInAC({ value: true }));
            dispatch(
                setProfileAC({
                    value: { nickName: res.data.name, id: res.data._id, avatar: res.data.avatar, email: res.data.email },
                })
            );
        })
        .finally(() => {
            dispatch(setIsInitializedAC({ value: true }));
            dispatch(setAppStatusAC({ status: 'succeeded' }));
        });
};
