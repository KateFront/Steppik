import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {packApi} from "../api/packs/packApi";
import {AppRootStateType, AppThunkDispatch} from "./store";
import {
    CardPackItem, CardPackItemResponse,
    GetPackParams,
    PostPackType,
    PutPackType, UpdateCardPackItemResponse, UpdatePackTypeModel
} from "../api/packs/typesPack";

export enum SortPackType {
    A = 1,
    Z = 0
}

type initialStateType = {
    packs: CardPackItem[],
    pageSize: number,
    totalCount: number,
    currentPage: number,
    activePackId: null | string
}
const initialState: initialStateType = {
    packs: [],
    pageSize: 1,
    totalCount: 4,
    currentPage: 1,
    activePackId: null,
}

const slice = createSlice({
    name: 'pack',
    initialState: initialState,
    reducers: {
        setCurrentPageAC: (state, action: PayloadAction<{ currentPage: number }>) => {
            state.currentPage = action.payload.currentPage;
        },
        setTotalCountAC: (state, action: PayloadAction<{ count: number }>) => {
            state.totalCount = action.payload.count
        },
        setActivePackIdAC(state, action: PayloadAction<{ packId: string }>) {
            state.activePackId = action.payload.packId;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(deletePackTC.fulfilled, (state, action) => {
            const index = state.packs.findIndex(pack => pack.id === action.payload._id);
            if (index > -1) {
                state.packs.splice(index, 1)
            }
        });
        builder.addCase(createNewPacksTC.fulfilled, (state, action) => {
            state.packs.unshift(action.payload);
        });
        builder.addCase(updatePacksTC.fulfilled, (state, action) => {
            const index = state.packs.findIndex(pack => pack.id === action.payload.updatedCardsPack._id)
            if (index > -1) {
                state.packs[index].name = action.payload.updatedCardsPack.name;
            }
        });
        builder.addCase(getPacksTC.fulfilled, (state, action) => {
            state.packs = action.payload;
        });
    }
});

export const packsReducer = slice.reducer;

export const {
    setCurrentPageAC,
    setTotalCountAC,
    setActivePackIdAC
} = slice.actions;


export const getPacksTC = createAsyncThunk<CardPackItem[], GetPackParams>
('packs/get', async (requestParams) => {
    const res = await packApi.getPack(requestParams);
    const tablePacks: CardPackItem[] = res.data.cardPacks.map((el) => {
        return {
            id: el._id,
            userId: el.user_id,
            name: el.name,
            cardsCount: el.cardsCount,
            updated: el.updated,
            created: el.created,
            userName: el.user_name
        }
    })
    return tablePacks;
});

export const updatePacksTC = createAsyncThunk<UpdateCardPackItemResponse, UpdatePackTypeModel, { dispatch: AppThunkDispatch, state: AppRootStateType }>
('packs/edit', async (updateModel, thunkApi) => {
    const id = thunkApi.getState().pack.activePackId ?? '';
    const updatePackModel: PutPackType = {
        cardsPack: {
            _id: id,
            ...updateModel
        }
    }
    const res = await packApi.updatePack(updatePackModel);
    return res.data;
});

export const createNewPacksTC = createAsyncThunk<CardPackItem, PostPackType>
('packs/create', async (cardsPack) => {
    const res = await packApi.createPack(cardsPack);
    const payload: CardPackItem = {
        id: res.data.newCardsPack._id,
        userId: res.data.newCardsPack.user_id,
        name: res.data.newCardsPack.name,
        cardsCount: res.data.newCardsPack.cardsCount,
        updated: res.data.newCardsPack.updated,
        created: res.data.newCardsPack.created,
        userName: res.data.newCardsPack.user_name
    }
    return payload;
});
export const deletePackTC = createAsyncThunk<CardPackItemResponse, undefined, { dispatch: AppThunkDispatch, state: AppRootStateType }>
('packs/delete', async (params, thunkApi) => {
    const id = thunkApi.getState().pack.activePackId;
    const res = await packApi.deletePack(id ?? '');
    return res.data.deletedCardsPack;
});