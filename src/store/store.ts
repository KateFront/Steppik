import { AnyAction, combineReducers } from 'redux';
import { authReducer } from './auth-reducer';
import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import thunkMiddleware, { ThunkDispatch } from 'redux-thunk';
import { appReducer } from './app-reducer';
import { packsReducer } from './pack-reducer';
import { cardsReducer } from './card-reducer';

const rootReducer = combineReducers({
    auth: authReducer,
    app: appReducer,
    pack: packsReducer,
    card: cardsReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunkMiddleware),
});

export type AppRootStateType = ReturnType<typeof rootReducer>;
export type AppThunkDispatch = ThunkDispatch<AppRootStateType, any, AnyAction>;
export const useAppDispatch = () => useDispatch<AppThunkDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector;

// @ts-ignore
window.store = store;
