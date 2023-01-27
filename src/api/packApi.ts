import axios from 'axios';
import {
    CardPackItemResponse,
    CreatePackResponse,
    GetPackParams,
    GetPackResponse,
    PostPackType,
    PutPackType
} from "./types";
import {ResponseType} from "./authApi";

const instance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0/cards',
    withCredentials: true
})


export const packApi = {
    getPack(params?: GetPackParams) {
        return instance.get<unknown, ResponseType<GetPackResponse>>(`/pack`, {
            params: params
        })
    },
    createPack(cardsPack: PostPackType) {
        return instance.post<PostPackType, ResponseType<CreatePackResponse>>(`/pack`, cardsPack);
    },
    deletePack(packId: string) {
        return instance.delete<unknown, ResponseType<any>>(`/pack/?id=${packId}`);
    },
    updatePack(newCardsPack: PutPackType) {
        return instance.put<PutPackType, ResponseType<CardPackItemResponse> >(`/pack`, newCardsPack);
    }
}

