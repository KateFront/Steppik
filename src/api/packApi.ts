import axios, {AxiosResponse} from 'axios';
import {CardPackItem, CardPackItemResponse, GetPackParams, GetPackResponse, PostPackType, PutPackType} from "./types";

const instance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0/cards',
    withCredentials: true
})


export const packApi = {
    getPack(params?: GetPackParams) {
        return instance.get<unknown, AxiosResponse<GetPackResponse>>(`/pack`, {
            params: params
        })
    },
    createPack(cardsPack: PostPackType) {
        return instance.post(`/pack`, cardsPack);
    },
    deletePack(packId: string) {
        return instance.delete(`/pack/?id=${packId}`);
    },
    updatePack(cardsPack: PutPackType) {
        return instance.put<PutPackType, AxiosResponse<CardPackItemResponse> >(`/pack`, cardsPack);
    }
}

