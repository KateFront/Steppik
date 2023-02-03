import React, {FC, useState} from 'react';
import styles from "./MainPackList.module.scss";
import Button from "../../../../components/atoms/Button/Button";
import PopupNewPack from "../../../../components/organisms/modals/PopupNewPack/PopupNewPack";
import {useAppDispatch} from "../../../../store/store";
import {useDebounce} from "../../../../hooks/useDebounce";
import {searchPacksAC} from "../../../../store/pack-reducer";
import Search from "../../../../assets/Icons/search.svg";
import RangeInput from "../../../../components/atoms/RangeInput/RangeInput";
import ShowSwitchPacks from "../Switch/ShowSwitchPacks";

const MainPackList: FC = () => {
    const dispatch = useAppDispatch();
    const [modalActive, setModalActive] = useState(false);
    const [search, setSearch] = useState('');
    const [switchOn, setSwitchOn] = useState(false);

    const [rangeValue, setRangeValue] = useState([0, 100]);
    const debounceRequest = useDebounce((value: string) => dispatch(searchPacksAC({search: value})), 500);
    const searchHandler = (value: string) => {
        setSearch(value);
        debounceRequest(value);
    }


    return (<div>
            {
                <>
                    <div className={styles.wrapper}>
                        <div className={styles.titleWrapper}>
                            <span>Pack list</span>
                        </div>
                        <div className={styles.buttonWrapper}>
                            <Button isDisabled={false} name={'Add new pack'}
                                    onClick={() => setModalActive(true)}/>
                        </div>
                    </div>
                    <div className={styles.filtersWrapper}>
                        <div className={styles.searchItem}>
                            <img src={Search} alt="search"/>
                            <input value={search} type="search" placeholder={'Provide your text'}
                                   className={styles.inputWrapper}
                                   onChange={(e) => searchHandler(e.currentTarget.value)}/>
                        </div>
                        <div className={styles.switchWrapper}>
                            <ShowSwitchPacks switchOn={switchOn} setSwitchOn={setSwitchOn}/>
                        </div>
                        <RangeInput value={rangeValue}
                                    onChange={(value) => setRangeValue(value)}
                                    max={100}
                                    min={0}
                                    step={2}/>
                    </div>
                </>
            }
            {
                modalActive &&
                <PopupNewPack setActive={setModalActive} onClose={() => console.log("saasassa")}/>
            }
        </div>
    );
};

export default MainPackList;
