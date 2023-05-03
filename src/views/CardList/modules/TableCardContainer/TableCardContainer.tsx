import React, { useState } from 'react';
import { TableCardCellItem } from './TableCardList/TableCardList';
import { useAppDispatch, useAppSelector } from '../../../../store/store';
import { setActiveCardIdAC } from '../../../../store/card-reducer';
import PopupEditCard from '../../../../components/organisms/modals/PopupCards/PopupEditCard/PopupEditCard';
import PopupDeleteCard from '../../../../components/organisms/modals/PopupCards/PopupDeleteCards/PopupDeleteCards';
import TableCardList from './TableCardList/TableCardList';

const TableCardContainer = () => {
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
            questionImg: cardItem.questionImg,
            answerImg: cardItem.answerImg,
        };
    });

    return (
        <>
            <TableCardList cardList={mappedCardList} />
            {showEditPopup && (
                <PopupEditCard active={showEditPopup} setActive={setShowEditPopup} onClose={() => setShowEditPopup(true)} />
            )}
            {showDeletePopup && (
                <PopupDeleteCard
                    active={showDeletePopup}
                    setActive={setShowDeletePopup}
                    onClose={() => setShowDeletePopup(true)}
                />
            )}
        </>
    );
};

export default TableCardContainer;
