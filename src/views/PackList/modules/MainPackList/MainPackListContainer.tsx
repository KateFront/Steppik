import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../../store/store";
import MainPackList from "./MainPackList";
import PopupEditPack from "../../../../components/organisms/modals/PopupEditPack/PopupEditPack";
import PopupDeletePack from "../../../../components/organisms/modals/PopupDeletePack/PopupDeletePack";
import {setActivePackIdAC} from "../../../../store/pack-reducer";
import {useNavigate} from "react-router-dom";
import TablePack, {ActionType, TableCellItem} from "../../TablePack/TablePack";


const MainPackListContainer = () => {
    const packList = useAppSelector(s => s.pack.packs);
    const mainUserId = useAppSelector(state => state.app.myUserID);


    const [showEditPopup, setShowEditPopup] = useState(false);
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [showLearnPopup, setShowLearnPopup] = useState(false);



    const dispatch = useAppDispatch();

    const handleEditClick = (packId: string) => {
        dispatch(setActivePackIdAC({packId}));
        setShowEditPopup(true);
    }
    const handleDeleteClick = (packId: string) => {
        dispatch(setActivePackIdAC({packId}));
        setShowDeletePopup(true);
    }

    const navigate = useNavigate();
    const handleLearnClick = (packId: string) => {
        navigate(`/packs/cards/${packId}`);
    }


    const mappedPackList: TableCellItem[] = packList.map((packItem) => {
            const actions: ActionType[] = [
                {
                    name: 'Learn', action: () => {
                        handleLearnClick(packItem.id)
                    }
                }
            ];
            const deleteAction = {
                name: 'Delete', action: () => {
                    handleDeleteClick(packItem.id)
                }
            };

            const editAction = {
                name: 'Edit', action: () => {
                    handleEditClick(packItem.id)
                }
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
                lastUpdated: packItem.updated,
                createdBy: packItem.userName,
                actions: actions,
            }
        }
    );

    return (
        <>

            <MainPackList />
            <TablePack packList={ mappedPackList}/>
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