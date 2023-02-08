import React, { FC, useState } from 'react';
import styles from './MainCardList.module.scss';
import RectangleButton from '../../../../components/atoms/RectangleButton/RectangleButton';
import { useAppDispatch, useAppSelector } from '../../../../store/store';
import Button from '../../../../components/atoms/Button/Button';
import PopupNewCard from '../../../../components/organisms/modals/PopupNewCard/PopupNewCard';
import { useDebounce } from '../../../../hooks/useDebounce';
import { searchPacksAC } from '../../../../store/pack-reducer';
import Container from '../../../../components/atoms/Container/Container';
import InputSearch from '../../../../components/atoms/InputSearch/InputSearch';
import SelectAction, { SelectOption } from '../../../../components/atoms/Select/SelectAction/SelectAction';

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

const options: SelectOption[] = [
    { label: 'Edit', value: '1' },
    { label: 'Delete', value: '2' },
    { label: 'Learn', value: '3' },
];

const MainCardList: FC<MainCardListPropsType> = ({ cardList }) => {
    const dispatch = useAppDispatch();
    const [search, setSearch] = useState('');
    const [modalActive, setModalActive] = useState(false);

    const [value, setValue] = useState<(typeof options)[0] | undefined>(options[0]);
    console.log(value);

    const isMyPack = useAppSelector((state) => state.card.isMyPack);

    const debounceRequest = useDebounce((value: string) => dispatch(searchPacksAC({ search: value })), 500);
    const searchHandler = (value: string) => {
        setSearch(value);
        debounceRequest(value);
    };

    return (
        <Container>
            {
                <>
                    <div className={styles.wrapper}>
                        <div className={styles.titleWrapper}>
                            <span>{isMyPack ? 'My pack' : 'Friend`s pack'}</span>
                            <div>
                                <SelectAction onChange={(o) => setValue(o)} options={options} />
                            </div>
                        </div>
                        <div className={styles.buttonWrapper}>
                            <Button
                                isDisabled={false}
                                name={isMyPack ? 'Add new pack' : 'Learn pack'}
                                onClick={() => setModalActive(true)}
                            />
                        </div>
                    </div>
                    <div className={styles.searchItem}>
                        <div className={styles.searchItem}>
                            <InputSearch
                                value={search}
                                placeholder={'Provide your text'}
                                onChange={(value) => searchHandler(value)}
                            />
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
                                            )}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </>
            }
            {modalActive && <PopupNewCard setActive={setModalActive} onClose={() => console.log('saasassa')} />}
        </Container>
    );
};

export default MainCardList;
