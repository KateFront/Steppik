import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
    CardGradeResponse,
    CardGradeType,
    CardType,
    DeletedCardResponse,
    GetCardParams,
    GetCardResponse,
    PostCardType,
    PutCardType,
    UpdatedCard,
} from '../api/cards/typesCards';
import { cardsApi } from '../api/cards/cardsApi';
import { AppRootStateType, AppThunkDispatch } from './store';
import { setAppStatusAC } from './app-reducer';

type initialStateType = {
    cards: CardType[];
    pageSize: number;
    totalCardCount: number;
    currentPage: number;
    activeCardId: null | string;
    isMyPack: boolean;
    packName: string;
    packDeckCover?: string;
};
export const initialState: initialStateType = {
    cards: [],
    pageSize: 10,
    totalCardCount: 100,
    currentPage: 1,
    activeCardId: null,
    isMyPack: false,
    packName: '',
    packDeckCover: '',
};

const slice = createSlice({
    name: 'card',
    initialState: initialState,
    reducers: {
        setPackDeckCoverAC: (state, action: PayloadAction<{ value: string }>) => {
            state.packDeckCover = action.payload.value;
        },
        setCurrentPageAC: (state, action: PayloadAction<{ newCardPage: number }>) => {
            state.currentPage = action.payload.newCardPage;
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
            const totalCount = action.payload.cardsTotalCount;
            const tableCards: CardType[] = action.payload.cards.map((el) => {
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
                    answerImg: el.answerImg,
                    questionImg: el.questionImg,
                    questionVideo: el.questionVideo,
                    answerVideo: el.answerVideo,
                };
            });

            state.cards = tableCards;
            state.totalCardCount = totalCount;
            state.packName = action.payload.packName;
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
        builder.addCase(updateCardTC.fulfilled, (state, action) => {
            const index = state.cards.findIndex((card) => card.id === action.payload.updatedCard._id);
            if (index > -1) {
                const currentCard = state.cards[index];
                currentCard.answer = action.payload.updatedCard.answer;
                currentCard.answerImg = action.payload.updatedCard.answerImg;
                currentCard.question = action.payload.updatedCard.question;
                currentCard.questionImg = action.payload.updatedCard.questionImg;
            }
        });
    },
});

export const cardsReducer = slice.reducer;

export const { setActiveCardIdAC, setCurrentPageAC, setMyCardAC, setPackDeckCoverAC } = slice.actions;

export const getCardsTC = createAsyncThunk<
    GetCardResponse,
    GetCardParams,
    { dispatch: AppThunkDispatch; state: AppRootStateType }
>('cards/get', async (requestParams, thunkApi) => {
    thunkApi.dispatch(setAppStatusAC({ status: 'loading' }));
    const res = await cardsApi.getCards(requestParams);
    const isMyPack = res.data.packUserId === thunkApi.getState().app.profile?.id;
    thunkApi.dispatch(setMyCardAC({ isMyPack }));
    thunkApi.dispatch(setPackDeckCoverAC({ value: res.data.packDeckCover }));
    thunkApi.dispatch(setAppStatusAC({ status: 'succeeded' }));
    return res.data;
});

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
        answerImg: res.data.newCard.answerImg,
        questionImg: res.data.newCard.questionImg,
        questionVideo: res.data.newCard.questionVideo,
        answerVideo: res.data.newCard.answerVideo,
    };
    return payload;
});

export const upgradeCardGradeTC = createAsyncThunk<CardGradeResponse, CardGradeType>('cards/update', async (cardGrade) => {
    const res = await cardsApi.updateCardGrade(cardGrade);
    return res.data;
});

export const updateCardTC = createAsyncThunk<UpdatedCard, PutCardType, { dispatch: AppThunkDispatch; state: AppRootStateType }>(
    'cards/updateCard',
    async (updateModel) => {
        const res = await cardsApi.updateCard(updateModel);
        console.log(res);
        return res.data;
    }
);

export const deleteCardsTC = createAsyncThunk<
    DeletedCardResponse,
    undefined,
    { dispatch: AppThunkDispatch; state: AppRootStateType }
>('cards/delete', async (params, thunkApi) => {
    const id = thunkApi.getState().card.activeCardId;
    const res = await cardsApi.deleteCard(id ?? '');
    return res.data;
});
