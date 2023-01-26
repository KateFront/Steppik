import React, {FC, useEffect} from 'react';
import CommonPageWrapper from "../../components/atoms/CommonPageWrapper/CommonPageWrapper";
import styles from './PackList.module.scss';
import Settings from "./modules/Settings/Settings";
import {useAppDispatch} from "../../store/store";
import {getPacksTC} from "../../store/pack-reducer";
import MainPackListContainer from "./modules/MainPackList/MainPackListContainer";


const PackList: FC = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getPacksTC());
    },[])

    return (
        <div>
            <CommonPageWrapper>
                <div className={styles.wrapper}>
                    <div className={styles.settingsWrapper}>
                        <Settings/>
                    </div>
                    <div className={styles.mainPackWrapper}>
                        <MainPackListContainer/>
                    </div>
                    <div>
                        {/*  <Paginator/>*/}
                    </div>
                </div>
            </CommonPageWrapper>
        </div>
    );
};

export default PackList;