export type GetCardParams = {
    cardAnswer?: string;
    cardQuestion?: string;
    cardsPack_id?: string;
    min?: number;
    max?: number;
    sortCards?: number;
    page?: number;
    pageCount?: number;
};

export type GetCardResponse = {
    cards: CardTypeResponse[];
    cardsTotalCount: number;
    maxGrade: number;
    minGrade: number;
    page: number;
    pageCount: number;
    packUserId: string;
};
export type CardType = {
    answer: string;
    question: string;
    cardsPackId: string;
    grade: number;
    shots: number;
    userId: string;
    created: string;
    updated: string;
    id: string;
};

export type CardGradeType = {
    grade: number;
    card_id: string;
};

export type CardGradeResponse = {
    updatedGrade: {
        _id: string;
        cardsPack_id: string;
        card_id: string;
        user_id: string;
        grade: number;
        shots: number;
    };
};

export type CardTypeResponse = {
    answer: string;
    question: string;
    cardsPack_id: string;
    grade: number;
    shots: number;
    user_id: string;
    created: string;
    updated: string;
    _id: string;
};

export type PostCardType = {
    card: {
        cardsPack_id: string;
        question: string;
        answer: string;
        grade?: number;
        shots?: number;
        answerImg?: string;
        questionImg?: string;
        questionVideo?: string;
        answerVideo?: string;
    };
};

export type CreatePackResponse = {
    newCard: CardTypeResponse;
};
export type PutCardType = {
    card: {
        _id: string;
        question?: string;
        answerImg: string;
    };
};
export type GradeCardResponseType = {
    token: string;
    tokenDeathTime: number;
    updatedGrade: {
        card_id: string;
        cardsPack_id: string;
        created: string;
        grade: number;
        more_id: string;
        shots: number;
        updated: string;
        user_id: string;
        __v: number;
        _id: string;
    };
};
export type UpdateCardTypeModel = {
    name?: string;
};
