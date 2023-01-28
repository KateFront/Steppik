import React, {FC, useState} from 'react';
import styles from "./MainPackList.module.scss";
import RectangleButton from "../../../../components/atoms/RectangleButton/RectangleButton";
import Button from "../../../../components/atoms/Button/Button";
import PopupNewPack from "../../../../components/organisms/modals/PopupNewPack/PopupNewPack";

export type TableCellItem = {
    id: string,
    ownerId: string,
    name: string,
    cards: number,
    lastUpdated: string,
    createdBy: string,
    actions: ActionType[]
}

export  type ActionType = {
    name: string,
    action: () => void
}

type HeadType = {
    name: string,
    action?: () => void,
};

const headRow: HeadType[] = [
    {
        name: 'Name'
    }, {
        name: 'Cards'
    }, {
        name: 'Last Updated',
        action: () => {
        },
    }, {
        name: 'Created By'
    }, {
        name: 'Actions'
    }
]
type MainPackListPropsType = {
    packList: TableCellItem[];
}

const MainPackList: FC<MainPackListPropsType> = ({packList}) => {
    const [modalActive, setModalActive] = useState(false);


    return (<div>
            {
                <>
                    <div className={styles.titleWrapper}>
                        <span>Pack list</span>
                    </div>
                    <div className={styles.searchWrapper}>
                        <div className={styles.searchItem}>
                            <input type="search" placeholder={'Search'} className={styles.inputWrapper}/>
                        </div>
                        <div className={styles.buttonWrapper}>
                            <Button isDisabled={false} name={'Add new pack'}
                                    onClick={() => setModalActive(true)}/>
                        </div>
                    </div>
                    <div className={styles.tableWrapper}>
                        <table>
                            <thead className={styles.packListWrapper}>
                            <tr>
                                {headRow.map((val, key) => {
                                    return (
                                        <th key={key} className={` ${val.action ? styles.headTableItem : ''} `}>
                                            {val.name}
                                        </th>
                                    )
                                })}
                            </tr>
                            </thead>
                            <tbody>
                            {packList.map((val) => {
                                return (
                                    <tr key={val.id} className={styles.tableRowItem}>
                                        <td>{val.name}</td>
                                        <td>{val.cards}</td>
                                        <td>{val.lastUpdated}</td>
                                        <td>{val.createdBy}</td>
                                        <td>{val.actions.map((el, index) => {
                                            return <div key={el.name} className={styles.btn}>
                                                <RectangleButton onClick={el.action} name={el.name}
                                                                 isDisabled={false}
                                                                 type={el.name === 'Delete' ? 'attention' : 'secondary'}
                                                />
                                            </div>
                                        })}</td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                    </div>
                </>
            }
            {
                modalActive &&
                <PopupNewPack setActive={setModalActive} onClose={() =>console.log("saasassa")}/>
            }
        </div>
    );
};

export default MainPackList;
