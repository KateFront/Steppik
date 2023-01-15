import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const initialState = {
    isRegistered: false,
    registrationError: null
}

const slice = createSlice({
    name: 'signup',
    initialState: initialState,
    reducers: {
        setIsRegisteredAC(state, action: PayloadAction<{value: boolean}>) {
            state.isRegistered = action.payload.value;
        },
        setRegistrationErrorAC(state, action: PayloadAction<{registrationError: null}>){
            state.registrationError = action.payload.registrationError
        }
    }
});

export const signUpReducer = slice.reducer;
export const {setIsRegisteredAC, setRegistrationErrorAC} = slice.actions;