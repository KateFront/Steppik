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
    _id: string
    name?: string
}
export type PutPackTypeResponse = {
    newCardPack: {
        _id: string
        name?: string
    }
}

