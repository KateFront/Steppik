import React, { useState } from 'react';
import MainCardList, { TableCardCellItem } from './MainCardList';
import { useAppDispatch, useAppSelector } from '../../../../store/store';
import { setActiveCardIdAC } from '../../../../store/card-reducer';
import PopupEditPack from '../../../../components/organisms/modals/PopupEditPack/PopupEditPack';
import PopupDeletePack from '../../../../components/organisms/modals/PopupDeletePack/PopupDeletePack';

const MainCardListContainer = () => {
    const cardsList = useAppSelector((s) => s.card.cards);
    const isMyPack = useAppSelector((state) => state.card.isMyPack);

    const [showEditPopup, setShowEditPopup] = useState(false);
    const [showDeletePopup, setShowDeletePopup] = useState(false);

    const dispatch = useAppDispatch();

    const handleEditClick = (cardId: string) => {
        dispatch(setActiveCardIdAC({ cardId }));
        setShowEditPopup(true);
    };
    const handleDeleteClick = (cardId: string) => {
        dispatch(setActiveCardIdAC({ cardId }));
        setShowDeletePopup(true);
    };

    /*const navigate = useNavigate();
    const handleLearnClick = (cardId: string) => {
        navigate(`/packs/cards/${cardId}`);
    };
*/
    const mappedCardList: TableCardCellItem[] = cardsList.map((cardItem) => {
        const deleteAction = {
            name: 'Delete',
            action: () => {
                handleDeleteClick(cardItem.id);
            },
        };

        const editAction = {
            name: 'Edit',
            action: () => {
                handleEditClick(cardItem.id);
            },
        };

        return {
            id: cardItem.id,
            ownerId: cardItem.userId,
            lastUpdated: cardItem.updated,
            actions: isMyPack ? [deleteAction, editAction] : null,
            question: cardItem.question,
            grade: cardItem.grade,
            answer: cardItem.answer,
            shots: cardItem.shots,
            created: cardItem.created,
        };
    });

    return (
        <>
            <MainCardList cardList={mappedCardList} />
            {showEditPopup && (
                <PopupEditPack active={showEditPopup} setActive={setShowEditPopup} onClose={() => setShowEditPopup(true)} />
            )}
            {showDeletePopup && (
                <PopupDeletePack
                    active={showDeletePopup}
                    setActive={setShowDeletePopup}
                    onClose={() => setShowDeletePopup(true)}
                />
            )}
        </>
    );
};

export default MainCardListContainer;
