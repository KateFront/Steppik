import React, { useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../../../store/store';
import { setActivePackIdAC } from '../../../../store/pack-reducer';
import TablePack, { ActionType, TableCellItem } from './TablePack/TablePack';
import { useNavigate } from 'react-router-dom';
import PopupDeletePack from '../../../../components/organisms/modals/PopupPack/PopupDeletePack/PopupDeletePack';
import PopupEditPack from '../../../../components/organisms/modals/PopupPack/PopupEditPack/PopupEditPack';

const TableContainer = () => {
    const packList = useAppSelector((s) => s.pack.packs);
    const mainUserId = useAppSelector((state) => state.app.profile?.id);
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [isShowEditPopup, setIsShowEditPopup] = useState(false);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleEditClick = (packId: string) => {
        setIsShowEditPopup(true);
        dispatch(setActivePackIdAC({ packId }));
    };
    const handleDeleteClick = (packId: string) => {
        dispatch(setActivePackIdAC({ packId }));
        setShowDeletePopup(true);
    };

    const handleLearnClick = (packId: string) => {
        if (mainUserId === packId) {
            console.log('Learn');
        } else {
            navigate(`/packs/cards/${packId}`);
        }
        dispatch(setActivePackIdAC({ packId }));
    };

    const mappedPackList: TableCellItem[] = packList.map((packItem) => {
        const actions: ActionType[] = [
            {
                name: 'Learn',
                action: () => {
                    handleLearnClick(packItem.id);
                },
            },
        ];
        const deleteAction = {
            name: 'Delete',
            action: () => {
                handleDeleteClick(packItem.id);
            },
        };

        const editAction = {
            name: 'Edit',
            action: () => {
                handleEditClick(packItem.id);
            },
        };

        if (mainUserId === packItem.userId) {
            actions.unshift(editAction);
            actions.unshift(deleteAction);
        }

        return {
            id: packItem.id,
            ownerId: packItem.userId,
            name: packItem.name,
            cards: packItem.cardsCount,
            lastUpdated: new Date(packItem.updated).toLocaleString(),
            createdBy: packItem.userName,
            actions: actions,
        };
    });

    return (
        <>
            <TablePack packList={mappedPackList} />
            {showDeletePopup && (
                <PopupDeletePack
                    active={showDeletePopup}
                    setActive={setShowDeletePopup}
                    onClose={() => setShowDeletePopup(true)}
                />
            )}
            {isShowEditPopup && (
                <PopupEditPack active={isShowEditPopup} setActive={setIsShowEditPopup} onClose={() => setIsShowEditPopup(true)} />
            )}
        </>
    );
};

export default TableContainer;
