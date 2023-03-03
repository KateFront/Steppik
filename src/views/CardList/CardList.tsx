import React, { useEffect, useState } from 'react';
import CommonPageWrapper from '../../components/atoms/CommonPageWrapper/CommonPageWrapper';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { getCardsTC, setCurrentPageAC } from '../../store/card-reducer';
import Paginator from '../../components/atoms/Paginator/Paginator';
import { GetCardParams } from '../../api/cards/typesCards';
import styles from './CardList.module.scss';
import Container from '../../components/atoms/Container/Container';
import Arrow from '../../assets/Icons/Arrow.svg';
import CardActions from './modules/CardActions/CardActions';
import Button from '../../components/atoms/Button/Button';
import PopupNewCard from '../../components/organisms/modals/PopupCards/PopupNewCard/PopupNewCard';
import InputSearch from '../../components/atoms/InputSearch/InputSearch';
import { useDebounce } from '../../hooks/useDebounce';
import { searchPacksAC } from '../../store/pack-reducer';
import TableCardContainer from './modules/TableCardContainer/TableCardContainer';

const CardList = () => {
    const totalCardCount = useAppSelector((state) => state.card.totalCardCount);
    const currentPage = useAppSelector((state) => state.card.currentPage);
    const pageSize = useAppSelector((state) => state.card.pageSize);
    const isMyPack = useAppSelector((state) => state.card.isMyPack);
    const packName = useAppSelector((state) => state.card.packName);
    const search = useAppSelector((state) => state.pack.search);

    const [modalActive, setModalActive] = useState(false);
    const [searchFilter, setSearchFilter] = useState('');

    const { cardId } = useParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const debounceRequest = useDebounce((value: string) => dispatch(searchPacksAC({ search: value })), 500);
    const searchHandler = (value: string) => {
        setSearchFilter(value);
        debounceRequest(value);
    };

    useEffect(() => {
        const params: GetCardParams = {
            pageCount: pageSize,
            page: currentPage,
            cardsPack_id: cardId,
        };
        if (cardId) dispatch(getCardsTC(params));
    }, [cardId, currentPage, pageSize, search]);

    if (!cardId) return <Navigate to={'/cards'} />;

    const onChangeCurrentPage = (newCardPage: number) => {
        dispatch(setCurrentPageAC({ newCardPage }));
    };

    const onClickToBack = () => {
        navigate('/packList');
    };

    const onClickBtn = () => {
        if (isMyPack) {
            setModalActive(true);
        } else {
            navigate('/learn');
        }
    };
    console.log(packName);
    return (
        <CommonPageWrapper customStyles={styles.mainCardWrapper}>
            <Container>
                <div>
                    <div className={styles.backPackList} onClick={onClickToBack}>
                        <img src={Arrow} alt="" className={styles.imgWrapper} />
                        Back to Packs List
                    </div>
                    <div className={styles.wrapper}>
                        <div className={styles.titleWrapper}>
                            <div className={styles.titleItem}>
                                <span>{isMyPack ? packName : 'Friend`s Pack'}</span>
                                {isMyPack && <CardActions />}
                            </div>
                        </div>
                        <div className={styles.buttonWrapper}>
                            <Button isDisabled={false} name={isMyPack ? 'Add new card' : 'Learn to pack'} onClick={onClickBtn} />
                        </div>
                    </div>
                </div>
                {totalCardCount > 0 && (
                    <div>
                        <div className={styles.searchItem}>
                            <div className={styles.searchItem}>
                                <span className={styles.textItem}>Search</span>
                                <InputSearch
                                    value={searchFilter}
                                    placeholder={'Provide your text'}
                                    onChange={(value) => searchHandler(value)}
                                />
                            </div>
                        </div>
                        <TableCardContainer />
                        <div className={styles.paginatorWrapper}>
                            <Paginator
                                currentPage={currentPage}
                                onPageChange={onChangeCurrentPage}
                                pageSize={pageSize}
                                totalCount={totalCardCount}
                                portionSize={pageSize}
                            />
                        </div>
                    </div>
                )}
                <span>This pack is empty. Click add new card to fill this pack</span>
                {modalActive && <PopupNewCard setActive={setModalActive} onClose={() => console.log('saasassa')} />}
            </Container>
        </CommonPageWrapper>
    );
};

export default CardList;
