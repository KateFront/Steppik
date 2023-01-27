export type GetPackParams = {
    packName?: string;
    min?: number;
    max?: number;
    sortPack?: string;
    page?: number;
    user_id?: string;
    block?: boolean;
    pageCount?: number;
}

export type CardPackItem = {
    id: string;
    userId: string;
    name: string;
    cardsCount: number;
    created: string;
    updated: string;
};

export type CardPackItemResponse = {
    _id: string;
    user_id: string;
    name: string;
    cardsCount: number;
    created: string;
    updated: string;
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
}

export type CreatePackResponse = {
    newCardsPack: CardPackItemResponse;
}

export type PostPackType = {
    cardsPack: {
        name: string;
        deckCover?: string;
        private?: boolean;
    }
}
export type PutPackType = {
    newCardsPack: {
        _id: string
        name?: string
    }
}

export type UserProfileType = {
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount: number; // количество колод

    created: Date;
    updated: Date;
    isAdmin: boolean;
    verified: boolean; // подтвердил ли почту
    rememberMe: boolean;

    error?: string;
}