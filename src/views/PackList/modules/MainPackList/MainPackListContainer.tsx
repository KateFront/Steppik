import React, {useState} from 'react';
import {useAppSelector} from "../../../../store/store";
import MainPackList, {ActionType, TableCellItem} from "./MainPackList";


const MainPackListContainer = () => {
        const packList = useAppSelector(s => s.pack.packs);
        const mainUserId = useAppSelector(state => state.app.myUserID)
        const [showPopup, setShowPopup] = useState(false);
        console.log(mainUserId);
        const handleClick = () => {
            setShowPopup(true);
        }


        const mappedPackList: TableCellItem[] = packList.map((packItem) => {
                const actions: ActionType[] = [
                    {
                        name: 'Learn', action: () => {
                            console.log('Delete')
                        }
                    }
                ];
                const deleteAction = {
                    name: 'Delete', action: () => {
                        console.log('Delete')
                    }
                };

                const editAction = {
                    name: 'Edit', action: () => {
                        console.log('Delete')
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
            <MainPackList packList={mappedPackList}/>
        );
    }
;

export default MainPackListContainer;