import React, {FC, useEffect, useState} from 'react';
import CommonPageWrapper from "../../components/atoms/CommonPageWrapper/CommonPageWrapper";
import styles from './PackList.module.scss';
import Settings from "./modules/Settings/Settings";
import {useAppDispatch, useAppSelector} from "../../store/store";
import {getPacksTC} from "../../store/pack-reducer";
import MainPackListContainer from "./modules/MainPackList/MainPackListContainer";
import {GetPackParams} from "../../api/packs/typesPack";


const PackList: FC = () => {
    const dispatch = useAppDispatch();
    const currentPage = useAppSelector<number>(s => s.pack.currentPage);
    const mainUserID = useAppSelector<string>(s => s.app.myUserID);
    const [switchOn, setSwitchOn] = useState(false);

    useEffect(() => {

        const params: GetPackParams = {
            ...(switchOn && {user_id: mainUserID}),
            pageCount: 10,

        };


        console.log(params)
        dispatch(getPacksTC(params));
    }, [currentPage, switchOn])

    return (
        <div>
            <CommonPageWrapper>
                <div className={styles.wrapper}>
                    <div className={styles.settingsWrapper}>
                        <Settings switchOn={switchOn} setSwitchOn={setSwitchOn}/>
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