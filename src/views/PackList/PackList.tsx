import React, { FC, useEffect, useState } from 'react';
import CommonPageWrapper from '../../components/atoms/CommonPageWrapper/CommonPageWrapper';
import styles from './PackList.module.scss';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { getPacksTC, setCurrentPageAC, setPageSizeAC } from '../../store/pack-reducer';
import MainPackListContainer from './modules/MainPackList/MainPackListContainer';
import { GetPackParams } from '../../api/packs/typesPack';
import Paginator from '../../components/atoms/Paginator/Paginator';
import Select from '../../components/atoms/Select/Select';
import ShowSwitchPacks from './modules/Switch/ShowSwitchPacks';

const PackList: FC = () => {
    const dispatch = useAppDispatch();

    const mainUserID = useAppSelector<string>((s) => s.app.myUserID);
    const [switchOn, setSwitchOn] = useState(false);

    const currentPage = useAppSelector<number>((s) => s.pack.currentPage);
    const pageSize = useAppSelector((state) => state.pack.pageSize);
    const totalCount = useAppSelector((state) => state.pack.totalCount);

    const search = useAppSelector((state) => state.pack.search);

    useEffect(() => {
        const params: GetPackParams = {
            ...(switchOn && { user_id: mainUserID }),
            pageCount: pageSize,
            page: currentPage,
            packName: search,
        };
        dispatch(getPacksTC(params));
    }, [currentPage, pageSize, switchOn, search]);

    const onPageChange = (newPageNumber: number) => {
        dispatch(setCurrentPageAC({ currentPage: newPageNumber }));
    };

    const handleChange = (value: string) => {
        dispatch(setPageSizeAC({ pageSize: +value }));
    };

    return (
        <div>
            <CommonPageWrapper>
                <div className={styles.wrapper}>
                    <div className={styles.switchWrapper}>
                        <ShowSwitchPacks switchOn={switchOn} setSwitchOn={setSwitchOn} />
                    </div>
                    <MainPackListContainer />
                    <div className={styles.paginatorWrapper}>
                        <Paginator
                            currentPage={currentPage}
                            pageSize={pageSize}
                            totalCount={totalCount}
                            onPageChange={onPageChange}
                            portionSize={pageSize}
                        />
                        <Select pageSize={pageSize} onChange={handleChange} />
                    </div>
                </div>
            </CommonPageWrapper>
        </div>
    );
};

export default PackList;
