import React, { FC, useEffect, useState } from 'react';
import CommonPageWrapper from '../../components/atoms/CommonPageWrapper/CommonPageWrapper';
import styles from './PackList.module.scss';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { getPacksTC, setCurrentPageAC, setPageSizeAC } from '../../store/pack-reducer';
import { GetPackParams } from '../../api/packs/typesPack';
import Paginator from '../../components/atoms/Paginator/Paginator';
import Select from '../../components/atoms/Select/Select';
import Button from '../../components/atoms/Button/Button';
import PopupNewPack from '../../components/organisms/modals/PopupPack/PopupNewPack/PopupNewPack';
import Container from '../../components/atoms/Container/Container';
import Filters from './modules/Filters/Filters';
import TableContainer from './modules/TableContainer/TableContainer';

const PackList: FC = () => {
    const dispatch = useAppDispatch();

    const mainUserID = useAppSelector<string | undefined>((s) => s.app.profile?.id);
    const [switchOn, setSwitchOn] = useState(false);
    const [modalActive, setModalActive] = useState(false);

    const currentPage = useAppSelector<number>((s) => s.pack.currentPage);
    const pageSize = useAppSelector((state) => state.pack.pageSize);
    const totalCount = useAppSelector((state) => state.pack.totalCount);
    const maxRange = useAppSelector((state) => state.pack.max);
    const minRange = useAppSelector((state) => state.pack.min);
    const sort = useAppSelector((state) => state.pack.sort);

    const search = useAppSelector((state) => state.pack.search);

    useEffect(() => {
        const params: GetPackParams = {
            ...(switchOn && { user_id: mainUserID }),
            pageCount: pageSize,
            page: currentPage,
            packName: search,
            min: minRange,
            max: maxRange,
            sortPack: sort,
        };
        dispatch(getPacksTC(params));
    }, [currentPage, pageSize, switchOn, search, maxRange, minRange, sort]);

    const onPageChange = (newPageNumber: number) => {
        dispatch(setCurrentPageAC({ currentPage: newPageNumber }));
    };

    const handleChange = (value: string) => {
        dispatch(setPageSizeAC({ pageSize: +value }));
    };

    return (
        <CommonPageWrapper customStyles={styles.packListPageWrapper}>
            <Container>
                <div className={styles.packTopWrapper}>
                    <div className={styles.titleWrapper}>
                        <span>Pack list</span>
                    </div>
                    <div className={styles.buttonWrapper}>
                        <Button isDisabled={false} name={'Add new pack'} onClick={() => setModalActive(true)} />
                    </div>
                </div>
                <div>
                    <Filters setSwitchOn={setSwitchOn} switchOn={switchOn} />
                    <TableContainer />
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
                {modalActive && <PopupNewPack setActive={setModalActive} onClose={() => console.log('saasassa')} />}
            </Container>
        </CommonPageWrapper>
    );
};

export default PackList;
