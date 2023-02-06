import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CardType, GetCardParams, PostCardType } from '../api/cards/typesCards';
import { cardsApi } from '../api/cards/cardsApi';
import { AppRootStateType, AppThunkDispatch } from './store';

type initialStateType = {
    cards: CardType[];
    pageSize: number;
    totalCardCount: number;
    currentPage: number;
    activeCardId: null | string;
    isMyCards: boolean;
};
export const initialState: initialStateType = {
    cards: [],
    pageSize: 5,
    totalCardCount: 100,
    currentPage: 1,
    activeCardId: null,
    isMyCards: false,
};

const slice = createSlice({
    name: 'card',
    initialState: initialState,
    reducers: {
        setCurrentPageAC: (state, action: PayloadAction<{ newCardPage: number }>) => {
            state.currentPage = action.payload.newCardPage;
        },
        setTotalCountAC: (state, action: PayloadAction<{ count: number }>) => {
            state.totalCardCount = action.payload.count;
        },
        setActiveCardIdAC(state, action: PayloadAction<{ cardId: string }>) {
            state.activeCardId = action.payload.cardId;
        },
        setPageSizeAC(state, action: PayloadAction<{ pageSize: number }>) {
            state.pageSize = action.payload.pageSize;
        },
        checkMyCardAC(state, action: PayloadAction<{ isMyPackCard: boolean }>) {
            state.isMyCards = action.payload.isMyPackCard;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getCardsTC.fulfilled, (state, action) => {
            state.cards = action.payload;
        });
        builder.addCase(createNewCardsTC.fulfilled, (state, action) => {
            state.cards.unshift(action.payload);
        });
    },
});

export const cardsReducer = slice.reducer;

export const { setTotalCountAC, setActiveCardIdAC, setPageSizeAC, setCurrentPageAC, checkMyCardAC } = slice.actions;

export const getCardsTC = createAsyncThunk<CardType[], GetCardParams, { dispatch: AppThunkDispatch; state: AppRootStateType }>(
    'packs/get',
    async (requestParams, thunkApi) => {
        const res = await cardsApi.getCard(requestParams);
        const totalCount = res.data.cardsTotalCount;
        thunkApi.dispatch(setTotalCountAC({ count: totalCount }));
        const tableCards: CardType[] = res.data.cards.map((el) => {
            return {
                answer: el.answer,
                question: el.question,
                cardsPackId: el.cardsPack_id,
                grade: el.grade,
                shots: el.shots,
                userId: el.user_id,
                created: el.created,
                updated: el.updated,
                id: el._id,
            };
        });
        return tableCards;
    }
);

export const createNewCardsTC = createAsyncThunk<CardType, PostCardType>('packs/create', async (card) => {
    const res = await cardsApi.createCard(card);
    const payload: CardType = {
        answer: res.data.newCard.answer,
        question: res.data.newCard.question,
        cardsPackId: res.data.newCard.cardsPack_id,
        grade: res.data.newCard.grade,
        shots: res.data.newCard.shots,
        userId: res.data.newCard.user_id,
        created: res.data.newCard.created,
        updated: res.data.newCard.updated,
        id: res.data.newCard._id,
        isMyCards: res.data.newCard.isMyCards,
    };
    return payload;
});
