import React, { FC } from 'react';
import styles from './TableCardList.module.scss';
import RectangleButton from '../../../../../components/atoms/RectangleButton/RectangleButton';

export type TableCardCellItem = {
    id: string;
    ownerId: string;
    lastUpdated: string;
    question: string;
    actions: ActionType[] | null;
    grade: number;
    answer: string;
    shots: number;
    created: string;
};

export type ActionType = {
    name: string;
    action: () => void;
};

type HeadType = {
    name: string;
    action?: () => void;
};

const headRow: HeadType[] = [
    {
        name: 'Question',
    },
    {
        name: 'Answer',
    },
    {
        name: 'Last Updated',
        action: () => {
            console.log('action');
        },
    },
    {
        name: 'Grade',
    },
    {
        name: '',
    },
];

type MainCardListPropsType = {
    cardList: TableCardCellItem[];
};

const TableCardList: FC<MainCardListPropsType> = ({ cardList }) => {
    return (
        <div className={styles.tableWrapper}>
            <table>
                <thead className={styles.packListWrapper}>
                    <tr>
                        {headRow.map((val, index) => {
                            return (
                                <th key={index} className={` ${val.action ? styles.headTableItem : ''} `}>
                                    {val.name}
                                </th>
                            );
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
                                {val.actions !== null && (
                                    <td>
                                        {val.actions.map((el, index) => {
                                            return (
                                                <div key={index} className={styles.btn}>
                                                    {
                                                        <RectangleButton
                                                            onClick={el.action}
                                                            name={el.name}
                                                            isDisabled={false}
                                                            type={el.name === 'Delete' ? 'attention' : 'secondary'}
                                                        />
                                                    }
                                                </div>
                                            );
                                        })}
                                    </td>
                                )}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default TableCardList;
