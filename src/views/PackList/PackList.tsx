import React, {FC} from 'react';
import CommonPageWrapper from "../../components/atoms/CommonPageWrapper/CommonPageWrapper";
import styles from './PackList.module.scss';
import Settings from "./modules/Settings/Settings";
import MainPackList from "./modules/MainPackList/MainPackList";


const PackList: FC = () => {

    return (
        <div>
            <CommonPageWrapper>
                <div className={styles.wrapper}>
                    <div className={styles.leftListWrapper}>
                        <Settings/>
                    </div>
                    <div className={styles.mainPackWrapper}>
                        <MainPackList/>
                    </div>
                </div>
            </CommonPageWrapper>
        </div>
    );
};

export default PackList;