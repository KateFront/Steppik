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


        const mappedPackList: TableCellItem[] = packList.map((el) => {
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

                if (mainUserId === el.userId) {
                    actions.push(deleteAction);
                    actions.push(editAction);
                }

                return {
                    id: el.id,
                    ownerId: el.userId,
                    name: el.name,
                    cards: el.cardsCount,
                    lastUpdated: el.updated,
                    createdBy: el.created,
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