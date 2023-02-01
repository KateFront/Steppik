import React, {useEffect} from 'react';
import CommonPageWrapper from "../../components/atoms/CommonPageWrapper/CommonPageWrapper";
import styles from "../PackList/PackList.module.scss";
import {useParams, Navigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../store/store";
import {getCardsTC, setCurrentPageAC} from "../../store/card-reducer";
import Paginator from "../../components/atoms/Paginator/Paginator";
import MainCardListContainer from "./modules/MainCardList/MainCardListContainer";
import {GetCardParams} from "../../api/cards/typesCards";


const CardList = () => {
    const dispatch = useAppDispatch();

    const cards = useAppSelector(state => state.card.cards);
    const totalCardCount = useAppSelector(state => state.card.totalCardCount);
    const currentPage = useAppSelector(state => state.card.currentPage);
    const pageSize = useAppSelector(state => state.card.pageSize);

    const search = useAppSelector(state => state.pack.search);

    const {cardId} = useParams();
    console.log(cardId);

    useEffect(() => {
        const params: GetCardParams = {
            pageCount: pageSize,
            page: currentPage,

        };
        if (cardId)
            dispatch(getCardsTC(params))

    }, [cardId, currentPage, pageSize, search ])
    if (!cardId) return <Navigate to={"/cards"}/>

    const onChangeCurrentPage = (newCardPage: number) => {
        dispatch(setCurrentPageAC({ newCardPage}))
    }

    return (
        <div>
            <CommonPageWrapper>
                <div className={styles.wrapper}>
                    <div className={styles.mainCardWrapper}>
                        <MainCardListContainer />
                        <div className={styles.paginatorWrapper}>
                            <Paginator currentPage={currentPage} onPageChange={onChangeCurrentPage}
                                       pageSize={pageSize} totalCount={totalCardCount} portionSize={pageSize}
                            />
                        </div>
                    </div>
                </div>
            </CommonPageWrapper>
        </div>
    );
};

export default CardList;