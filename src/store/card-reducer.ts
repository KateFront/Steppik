import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
    CardGradeResponse,
    CardGradeType,
    CardType,
    DeletedCardResponse,
    GetCardParams,
    PostCardType,
} from '../api/cards/typesCards';
import { cardsApi } from '../api/cards/cardsApi';
import { AppRootStateType, AppThunkDispatch } from './store';

type initialStateType = {
    cards: CardType[];
    pageSize: number;
    totalCardCount: number;
    currentPage: number;
    activeCardId: null | string;
    isMyPack: boolean;
};
export const initialState: initialStateType = {
    cards: [],
    pageSize: 5,
    totalCardCount: 100,
    currentPage: 1,
    activeCardId: null,
    isMyPack: false,
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
        setMyCardAC(state, action: PayloadAction<{ isMyPack: boolean }>) {
            state.isMyPack = action.payload.isMyPack;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getCardsTC.fulfilled, (state, action) => {
            state.cards = action.payload;
        });
        builder.addCase(createNewCardsTC.fulfilled, (state, action) => {
            state.cards.unshift(action.payload);
        });
        builder.addCase(deleteCardsTC.fulfilled, (state, action) => {
            const index = state.cards.findIndex((card) => card.id === action.payload.deletedCard._id);
            if (index > -1) {
                state.cards.splice(index, 1);
            }
        });
    },
});

export const cardsReducer = slice.reducer;

export const { setTotalCountAC, setActiveCardIdAC, setPageSizeAC, setCurrentPageAC, setMyCardAC } = slice.actions;

export const getCardsTC = createAsyncThunk<CardType[], GetCardParams, { dispatch: AppThunkDispatch; state: AppRootStateType }>(
    'cards/get',
    async (requestParams, thunkApi) => {
        const res = await cardsApi.getCard(requestParams);
        const isMyPack = res.data.packUserId === thunkApi.getState().app.profile?.id;
        thunkApi.dispatch(setMyCardAC({ isMyPack }));
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

export const createNewCardsTC = createAsyncThunk<CardType, PostCardType>('cards/create', async (card) => {
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
    };
    return payload;
});

export const upgradeCardsTC = createAsyncThunk<CardGradeResponse, CardGradeType>('cards/update', async (cardGrade) => {
    const res = await cardsApi.updateCardGrade(cardGrade);
    return res.data;
});

/*export const updateCardsTC = createAsyncThunk< { dispatch: AppThunkDispatch; state: AppRootStateType }
>('cards/edit', async (updateModel, thunkApi) => {
    const id = thunkApi.getState().cards.cardId ?? '';
    const updateCardModel: PutCardType  = {
        cardsPack: {
            _id: id,
            ...updateModel,
        },
    };
    const res = await cardsApi.updateCard(updateCardModel);
    return res.data;
});*/

export const deleteCardsTC = createAsyncThunk<
    DeletedCardResponse,
    undefined,
    { dispatch: AppThunkDispatch; state: AppRootStateType }
>('cards/delete', async (params, thunkApi) => {
    const id = thunkApi.getState().card.activeCardId;
    const res = await cardsApi.deleteCard(id ?? '');
    console.log(res);
    return res.data;
});
