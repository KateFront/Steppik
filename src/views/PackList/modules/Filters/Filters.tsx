import React, { FC, useState } from 'react';
import Switch from '../../../../components/atoms/Switch/Switch';
import styles from './Filters.module.scss';
import { useAppDispatch } from '../../../../store/store';
import { useDebounce } from '../../../../hooks/useDebounce';
import { searchPacksAC, setMinMaxAC } from '../../../../store/pack-reducer';
import RangeInput from '../../../../components/atoms/RangeInput/RangeInput';
import InputSearch from '../../../../components/atoms/InputSearch/InputSearch';

type FiltersProps = {
    switchOn: boolean;
    setSwitchOn: (value: boolean) => void;
};

const Filters: FC<FiltersProps> = ({ switchOn, setSwitchOn }) => {
    const dispatch = useAppDispatch();

    const [search, setSearch] = useState('');

    const debounceRequest = useDebounce((value: string) => dispatch(searchPacksAC({ search: value })), 500);
    const searchHandler = (value: string) => {
        setSearch(value);
        debounceRequest(value);
    };

    const debounceRange = useDebounce(({ min, max }: { min: number; max: number }) => dispatch(setMinMaxAC({ min, max })), 500);
    const rangeHandler = ({ min, max }: { min: number; max: number }) => {
        debounceRange({ min, max });
    };

    return (
        <div className={styles.contentWrapper}>
            <div className={styles.searchItem}>
                <span className={styles.textItem}>Search</span>
                <InputSearch value={search} placeholder={'Provide your text'} onChange={(value) => searchHandler(value)} />
            </div>
            <div className={styles.switchItem}>
                <span className={styles.textItem}>Show packs cards</span>
                <Switch onChange={setSwitchOn} isFirstBtnActive={switchOn} />
            </div>
            <div className={styles.rangeItemWrapper}>
                <span className={styles.textItem}>Number of cards</span>
                <div className={styles.rangeItem}>
                    <RangeInput onChange={(res) => rangeHandler(res)} max={100} min={0} />
                </div>
            </div>
        </div>
    );
};

export default Filters;
