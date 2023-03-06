import { cardsInstance } from '../axios_instances';
import {
    CardGradeResponse,
    CardGradeType,
    CreatePackResponse,
    DeletedCardResponse,
    GetCardParams,
    GetCardResponse,
    PostCardType,
    PutCardType,
    UpdatedCard,
} from './typesCards';
import { ResponseType } from '../auth/authApi';

export const cardsApi = {
    getCards(params?: GetCardParams) {
        return cardsInstance.get<GetCardResponse>('/card', {
            params,
        });
    },
    createCard(card: PostCardType) {
        return cardsInstance.post<PostCardType, ResponseType<CreatePackResponse>>(`/card`, card);
    },
    deleteCard(cardId: string) {
        return cardsInstance.delete<unknown, ResponseType<DeletedCardResponse>>(`/card/?id=${cardId}`);
    },
    updateCard(cardsPack: PutCardType) {
        return cardsInstance.put<PutCardType, ResponseType<UpdatedCard>>(`/card`, cardsPack);
    },
    updateCardGrade(cardGrade: CardGradeType) {
        return cardsInstance.put<CardGradeType, ResponseType<CardGradeResponse>>(`/grade`, cardGrade);
    },
};
