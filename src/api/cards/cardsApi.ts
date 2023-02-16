import { cardsInstance } from '../axios_instances';
import {
    CardGradeResponse,
    CardGradeType,
    CreatePackResponse,
    GetCardParams,
    GetCardResponse,
    PostCardType,
    PutCardType,
} from './typesCards';
import { ResponseType } from '../auth/authApi';

export const cardsApi = {
    getCard(params?: GetCardParams) {
        return cardsInstance.get<GetCardResponse>('/card', {
            params,
        });
    },
    createCard(card: PostCardType) {
        return cardsInstance.post<PostCardType, ResponseType<CreatePackResponse>>(`/card`, card);
    },
    deleteCard(cardId: string) {
        return cardsInstance.delete(`/card/?id=${cardId}`);
    },
    updateCard(cardsPack: PutCardType) {
        return cardsInstance.put(`/card`, cardsPack);
    },
    updateCardGrade(cardGrade: CardGradeType) {
        return cardsInstance.put<CardGradeType, ResponseType<CardGradeResponse>>(`/grade`, cardGrade);
    },
};
