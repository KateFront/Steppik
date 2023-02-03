import React, {FC, useState} from 'react';
import styles from "./MainCardList.module.scss";
import RectangleButton from "../../../../components/atoms/RectangleButton/RectangleButton";
import {useAppDispatch} from "../../../../store/store";
import Button from "../../../../components/atoms/Button/Button";

export type TableCardCellItem = {
    id: string,
    ownerId: string,
    lastUpdated: string,
    question: string,
    actions: ActionType[],
    grade: number,
    answer: string,
    shots: number,
    created: string
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
        name: 'Question'
    }, {
        name: 'Answer'
    }, {
        name: 'Last Updated',
        action: () => {
        },
    }, {
        name: 'Grade'
    }
]

type MainCardListPropsType = {
    cardList: TableCardCellItem[];
}


const MainCardList: FC<MainCardListPropsType> = ({cardList}) => {
    const dispatch = useAppDispatch();
    const [search, setSearch] = useState('');
    const [modalActive, setModalActive] = useState(false);

    const searchHandler = (value: string) => {
        setSearch(value)
        // debounce(() => dispatch(searchPacksAC({search: value})), 500)()//TODO ????
    }


    return (
        <div>
            <div className={styles.titleWrapper}>
                <span>My Pack</span>
            </div>
            <div className={styles.searchWrapper}>
                <div className={styles.searchItem}>
                    <input value={search} type="search" placeholder={'Search'} className={styles.inputWrapper}
                           onChange={(e) => searchHandler(e.currentTarget.value)}/>
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
                        {headRow.map((val, index) => {
                            return (
                                <th key={index} className={` ${val.action ? styles.headTableItem : ''} `}>
                                    {val.name}
                                </th>
                            )
                        })}
                    </tr>
                    </thead>
                    <tbody>
                    {cardList.map((val) => {
                        return (
                            <tr key={val.id} className={styles.tableRowItem}>
                                <td>{val.question}</td>
                                <td>{val.answer}</td>
                                <td>{val.lastUpdated}</td>
                                <td>{val.grade}</td>
                                <td>{val.actions.map((el,index) => {
                                    return <div key={index} className={styles.btn}>
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
        </div>
    );
};

export default MainCardList;