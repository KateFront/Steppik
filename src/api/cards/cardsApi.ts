import {cardsInstance} from "../axios_instances";
import {GetCardParams, GetCardResponse, PostCardType, PutCardType} from "./typesCards";


export const cardsApi = {
    getCard(params?: GetCardParams) {
        return cardsInstance.get<GetCardResponse>('/card', {
            params
        })
    },
    createCard(cardsPack: PostCardType) {
        return cardsInstance.post(`/card`, cardsPack);
    },
    deleteCard(cardId: string) {
        return cardsInstance.delete(`/card/?id=${cardId}`);
    },
    updateCard(cardsPack: PutCardType) {
        return cardsInstance.put(`/card`, cardsPack);
    }
}

