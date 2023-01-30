import {
    CreatePackResponse, DeleteCardPackItemResponse,
    GetPackParams,
    GetPackResponse,
    PostPackType,
    PutPackType, UpdateCardPackItemResponse
} from "./typesPack";
import {ResponseType} from "../authApi";
import {cardsInstance} from "../axios_instances";


export const packApi = {
    getPack(params?: GetPackParams) {
        return cardsInstance.get<GetPackResponse>('/pack', {
            params
        })
    },

    createPack(cardsPack: PostPackType) {
        return cardsInstance.post<PostPackType, ResponseType<CreatePackResponse>>(`/pack`, cardsPack);
    },
    deletePack(packId: string) {
        return cardsInstance.delete<DeleteCardPackItemResponse, ResponseType<DeleteCardPackItemResponse>>(`/pack/?id=${packId}`);
    },
    updatePack(cardsPack: PutPackType) {
        return cardsInstance.put<PutPackType, ResponseType<UpdateCardPackItemResponse>>(`/pack`, cardsPack);
    }
}

