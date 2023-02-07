import React, { FC, useState } from 'react';
import Switch from '../../../../components/atoms/Switch/Switch';
import styles from './Filters.module.scss';
import { useAppDispatch } from '../../../../store/store';
import { useDebounce } from '../../../../hooks/useDebounce';
import { searchPacksAC } from '../../../../store/pack-reducer';
import RangeInput from '../../../../components/atoms/RangeInput/RangeInput';
import InputSearch from '../../../../components/atoms/InputSearch/InputSearch';

type FiltersProps = {
    switchOn: boolean;
    setSwitchOn: (value: boolean) => void;
};

const Filters: FC<FiltersProps> = ({ switchOn, setSwitchOn }) => {
    const dispatch = useAppDispatch();

    const [search, setSearch] = useState('');
    /*const [rangeValue, setRangeValue] = useState({ minValue: 0, maxValue: 100 });*/

    const debounceRequest = useDebounce((value: string) => dispatch(searchPacksAC({ search: value })), 500);
    const searchHandler = (value: string) => {
        setSearch(value);
        debounceRequest(value);
    };
    return (
        <div className={styles.contentWrapper}>
            <div className={styles.searchItem}>
                <InputSearch value={search} placeholder={'Provide your text'} onChange={(value) => searchHandler(value)} />
            </div>
            <div>
                <span>Show packs cards</span>
                <Switch onChange={setSwitchOn} isFirstBtnActive={switchOn} />
            </div>
            <div>
                <RangeInput
                    /* maxValue={rangeValue.maxValue}
                    minValue={rangeValue.minValue}*/
                    onChange={(result) => ({ max: result.max, minValue: result.min })}
                    max={100}
                    min={0}
                />
            </div>
        </div>
    );
};

export default Filters;
