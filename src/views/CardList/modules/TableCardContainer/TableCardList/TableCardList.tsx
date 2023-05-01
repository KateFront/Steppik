import React, { FC } from 'react';
import styles from './TableCardList.module.scss';
import RectangleButton from '../../../../../components/atoms/RectangleButton/RectangleButton';
import { useAppSelector } from '../../../../../store/store';
import StarRating from '../../../../../components/atoms/GradeStars/StarRating';

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
    answerImg?: string;
    questionImg?: string;
};

export type ActionType = {
    name: string;
    action: () => void;
};

type HeadType = {
    name: string;
    action?: () => void;
};

type MainCardListPropsType = {
    cardList: TableCardCellItem[];
};

const TableCardList: FC<MainCardListPropsType> = ({ cardList }) => {
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
    const isMyPack = useAppSelector((state) => state.card.isMyPack);
    if (!isMyPack) {
        headRow.pop();
    }
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
                    {cardList.map((cardItem) => {
                        return (
                            <tr key={cardItem.id} className={styles.tableRowItem}>
                                <td>
                                    {cardItem.questionImg ? (
                                        <div className={styles.imgWrapper}>
                                            <img src={cardItem.questionImg} alt="img" />
                                        </div>
                                    ) : (
                                        cardItem.question
                                    )}
                                </td>
                                <td>
                                    {cardItem.answerImg ? (
                                        <div className={styles.imgWrapper}>
                                            <img src={cardItem.answerImg} alt="img" />
                                        </div>
                                    ) : (
                                        cardItem.answer
                                    )}
                                </td>
                                <td>{cardItem.lastUpdated}</td>
                                <td>{<StarRating totalStars={cardItem.grade} />}</td>
                                {cardItem.actions !== null && (
                                    <td>
                                        {cardItem.actions.map((el, index) => {
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
