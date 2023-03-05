export type GetPackParams = {
    packName?: string;
    min?: number;
    max?: number;
    sortPack?: string;
    page?: number;
    user_id?: string;
    block?: boolean;
    pageCount?: number;
};
export type GetPackResponse = {
    cardPacks: CardPackItemResponse[];
    page: number;
    pageCount: number;
    cardPacksTotalCount: number;
    minCardsCount: number;
    maxCardsCount: number;
    token: string;
    tokenDeathTime: number;
};

export type PostPackType = {
    cardsPack: {
        name: string;
        deckCover?: string;
        isPrivate?: boolean;
    };
};

export type PutPackType = {
    cardsPack: {
        _id: string;
        name?: string;
    };
};

export type UpdatePackTypeModel = {
    name?: string;
};

export type CreatePackResponse = {
    newCardsPack: CardPackItemResponse;
};

export type CardPackItem = {
    id: string;
    userId: string;
    name: string;
    userName: string;
    cardsCount: number;
    created: string;
    updated: string;
    deckCover?: string;
};

export type CardPackItemResponse = {
    user_name: string;
    private: false;
    path: string;
    grade: number;
    shots: number;
    type: string;
    rating: number;
    more_id: string;
    _id: string;
    user_id: string;
    name: string;
    cardsCount: number;
    created: string;
    updated: string;
    deckCover?: string;
};

export type DeleteCardPackItemResponse = {
    deletedCardsPack: CardPackItemResponse;
    token: string;
    tokenDeathTime: number;
};

export type UpdateCardPackItemResponse = {
    updatedCardsPack: CardPackItemResponse;
    token: string;
    tokenDeathTime: number;
};
