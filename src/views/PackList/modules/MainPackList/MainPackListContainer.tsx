import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../../store/store";
import MainPackList, {ActionType, TableCellItem} from "./MainPackList";
import PopupEditPack from "../../../../components/organisms/PopupEditPack/PopupEditPack";
import PopupDeletePack from "../../../../components/organisms/PopupDeletePack/PopupDeletePack";


const MainPackListContainer = () => {
    const packList = useAppSelector(s => s.pack.packs);
    const mainUserId = useAppSelector(state => state.app.myUserID);
    const [showEditPopup, setShowEditPopup] = useState(false);
    const [showDeletePopup, setShowDeletePopup] = useState(false);

    const dispatch = useAppDispatch();

    const handleEditClick = () => {
        setShowEditPopup(true);
    }
    const handleDeleteClick = () => {
        setShowDeletePopup(true);
    }


    const mappedPackList: TableCellItem[] = packList.map((packItem) => {
            const actions: ActionType[] = [
                {
                    name: 'Learn', action: () => {
                    }
                }
            ];
            const deleteAction = {
                name: 'Delete', action: () => {
                    handleDeleteClick()
                }
            };

            const editAction = {
                name: 'Edit', action: () => {
                    handleEditClick()
                }
            };

            if (mainUserId === packItem.userId) {
                actions.push(deleteAction);
                actions.push(editAction);
            }

            return {
                id: packItem.id,
                ownerId: packItem.userId,
                name: packItem.name,
                cards: packItem.cardsCount,
                lastUpdated: packItem.updated,
                createdBy: packItem.created,
                actions: actions,
            }
        }
    );

    return (
        <>
            <MainPackList packList={mappedPackList}/>
            {
                showEditPopup && <PopupEditPack active={showEditPopup} setActive={setShowEditPopup}
                                                onClose={() => setShowEditPopup(true)}/>
            }
            {
                showDeletePopup && <PopupDeletePack active={showDeletePopup} setActive={setShowDeletePopup}
                                                    onClose={() => setShowDeletePopup(true)}/>
            }
        </>

    );
};

export default MainPackListContainer;