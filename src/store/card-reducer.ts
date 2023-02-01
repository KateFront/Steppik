import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";


import {CardType, GetCardParams} from "../api/cards/typesCards";
import {cardsApi} from "../api/cards/cardsApi";
import {AppThunkDispatch} from "./store";
import {ActionType} from "../views/CardList/modules/MainCardList/MainCardList";


type initialStateType = {
    cards: CardType[],
    pageSize: number,
    totalCardCount: number,
    currentPage: number,
    activeCardId: null | string,

}
export const initialState: initialStateType = {
    cards: [],
    pageSize: 5,
    totalCardCount: 100,
    currentPage: 1,
    activeCardId: null,
}

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
    },
    extraReducers: (builder) => {
        builder.addCase(getCardsTC.fulfilled, (state, action) => {
            state.cards = action.payload;
        });

    }
});

export const cardsReducer = slice.reducer;

export const {
    setTotalCountAC,
    setActiveCardIdAC,
    setPageSizeAC,
    setCurrentPageAC
} = slice.actions;

export const getCardsTC = createAsyncThunk<CardType[], GetCardParams, { dispatch: AppThunkDispatch }>
('packs/get', async (requestParams, thunkApi) => {
    const res = await cardsApi.getCard(requestParams);
    const totalCount = res.data.cardsTotalCount;
    thunkApi.dispatch(setTotalCountAC({count: totalCount}));
    const tableCards: CardType[] = res.data.cards.map((el) => {
        return {
            id: el._id,
            ownerId: el.user_id,
            lastUpdated: el.updated,
            question: el.question,
            grade: el.grade,
            answer: el.answer,
            shots: el.shots,
            created: el.created,
            cardsPack_id: el.cardsPack_id
        }
        return tableCards;
    });
});