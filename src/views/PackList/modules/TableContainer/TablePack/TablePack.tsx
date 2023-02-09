import React, { FC } from 'react';
import styles from './TablePack.module.scss';
import RectangleButton from '../../../../../components/atoms/RectangleButton/RectangleButton';
import classnames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../../../../store/store';
import { setSortPackAC, SortPackType } from '../../../../../store/pack-reducer';

export type TableCellItem = {
    id: string;
    ownerId: string;
    name: string;
    cards: number;
    lastUpdated: string;
    createdBy: string;
    actions: ActionType[];
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
        name: 'Name',
    },
    {
        name: 'Cards',
    },
    {
        name: 'Last Updated',
        action: () => {
            console.log('table action');
        },
    },
    {
        name: 'Created By',
    },
    {
        name: 'Actions',
    },
];

type MainPackListPropsType = {
    packList: TableCellItem[];
};

const TablePack: FC<MainPackListPropsType> = ({ packList }) => {
    const sort = useAppSelector((state) => state.pack.sort);
    const dispatch = useAppDispatch();
    return (
        <div className={styles.tableWrapper}>
            <table>
                <thead className={styles.packListWrapper}>
                    <tr>
                        {headRow.map((val, key) => {
                            return (
                                <th
                                    onClick={() => {
                                        if (val.action) {
                                            const res = sort === SortPackType.AZ ? SortPackType.ZA : SortPackType.AZ;
                                            dispatch(setSortPackAC({ sort: res }));
                                        }
                                    }}
                                    key={key}
                                    className={classnames({
                                        [styles.headTableItem]: val.action,
                                        [styles.headTableItemActiveZA]: sort === SortPackType.ZA,
                                    })}
                                >
                                    {val.name}
                                </th>
                            );
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
                                <td>
                                    {val.actions.map((el) => {
                                        return (
                                            <div key={el.name} className={styles.btn}>
                                                <RectangleButton
                                                    onClick={el.action}
                                                    name={el.name}
                                                    isDisabled={false}
                                                    type={el.name === 'Delete' ? 'attention' : 'secondary'}
                                                />
                                            </div>
                                        );
                                    })}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default TablePack;
