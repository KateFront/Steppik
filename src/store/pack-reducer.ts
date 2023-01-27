import {createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit";
import {setAppErrorAC, setAppStatusAC} from "./app-reducer";
import {packApi} from "../api/packApi";
import {CardPackItem, GetPackParams, PostPackType} from "../api/types";

export enum SortPackType {
    A = 1,
    Z = 0
}

type initialStateType = {
    packs: CardPackItem[],
    pageSize: number,
    totalCount: number,
    currentPage: number,

}
const initialState: initialStateType = {
    packs: [],
    pageSize: 1,
    totalCount: 4,
    currentPage: 1,

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
        setPacksAC: (state, action: PayloadAction<{ packs: CardPackItem[] }>) => {
            state.packs = action.payload.packs;
        },
        createPackAC: (state, action: PayloadAction<{ newPack: CardPackItem }>) => {
            console.log(state.packs.length);
            state.packs.unshift(action.payload.newPack);
            console.log(state.packs.length);
        },
        deletePackAC(state, action: PayloadAction<{ packId: string }>) {
            const index = state.packs.findIndex(pack => pack.id === action.payload.packId)
            if (index > -1) {
                state.packs.splice(index, 1)
            }
        },
        updatePackAC(state, action: PayloadAction<{ value: CardPackItem }>) {
            const index = state.packs.findIndex(pack => pack.id === action.payload.value.id)
            state.packs[index].name = action.payload.value.name;
        }
    }
})

export const packsReducer = slice.reducer;

export const {setCurrentPageAC, setPacksAC, setTotalCountAC, deletePackAC, updatePackAC, createPackAC} = slice.actions;

export const getPacksTC = (params?: GetPackParams) => {
    return (dispatch: Dispatch) => {

        dispatch(setAppStatusAC({status: 'loading'}))
        packApi.getPack(params)
            .then((res) => {
                const tablePacks: CardPackItem[] = res.data.cardPacks.map((el) => {
                    return {
                        id: el._id,
                        userId: el.user_id,
                        name: el.name,
                        cardsCount: el.cardsCount,
                        updated: el.updated,
                        created: el.created,
                    }
                })
                dispatch(setPacksAC({packs: tablePacks}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            })
            .catch((error) => {
                setAppErrorAC(error)
            })
    }
}
export const updatePacksTC = (name: string, _id: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        packApi.updatePack({name, _id})
            .then((res) => {
                const value: CardPackItem = {
                    id: res.data._id,
                    userId: res.data.user_id,
                    name: res.data.name,
                    cardsCount: res.data.cardsCount,
                    updated: res.data.updated,
                    created: res.data.created,
                }
                dispatch(updatePackAC({value}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            })
            .catch((error) => {
                setAppErrorAC(error)
            })
    }
}
export const createNewPacksTC = (cardsPack: PostPackType) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        packApi.createPack(cardsPack)
            .then((res) => {
                const value: CardPackItem = {
                    id: res.data.newCardsPack._id,
                    userId: res.data.newCardsPack.user_id,
                    name: res.data.newCardsPack.name,
                    cardsCount: res.data.newCardsPack.cardsCount,
                    updated: res.data.newCardsPack.updated,
                    created: Date.now().toString(),
                }

                dispatch(createPackAC({newPack: value}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            })
            .catch((error) => {
                setAppErrorAC(error)
            })
    }
}
export const deletePackTC = (packId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        packApi.deletePack(packId)
            .then((res) => {
                dispatch(updatePackAC({value: res.data}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            })
            .catch((error) => {
                setAppErrorAC(error)
            })
    }
}
