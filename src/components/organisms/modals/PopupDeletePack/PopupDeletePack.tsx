import React, {FC} from 'react';
import styles from "./PopupDeletePack.module.scss";
import Button from "../../../atoms/Button/Button";
import {useAppDispatch} from "../../../../store/store";
import MainPopup from "../MainPopup/MainPopup";
import {deletePackTC} from "../../../../store/pack-reducer";

type PopupNewPackPropsType = {
    children?: React.ReactNode;
    active: boolean,
    setActive: (active: boolean) => void,
    onClose: () => void;
}

const PopupDeletePack: FC<PopupNewPackPropsType> = ({active, setActive, onClose}) => {
    const dispatch = useAppDispatch();

    const deletePack = () => {
        dispatch(deletePackTC());
        setActive(false);
    }


    return (
        <MainPopup onClose={onClose} title={'Delete pack'}>
            <div className={` ${styles.modal}`}>
                <div className={`${styles.modalContent}`}>
                    <div className={styles.popupWrapper}>
                        <span>Delete pack</span>
                    </div>
                    <div className={styles.popupSpanWrapper}>
                        <span>Do you really want to remove Pack Name - Name Pack?</span>
                        <span>  All cards will be deleted.  </span>
                    </div>
                    <div className={styles.btn}>
                        <div className={styles.btnLeft}>
                            <Button onClick={() => setActive(false)} name={'Cancel'} isDisabled={true}/></div>
                        <div className={styles.btnRight}>
                            <Button onClick={deletePack} name={'Delete'} isDisabled={false}/>
                        </div>
                    </div>
                </div>
            </div>
        </MainPopup>
    );
};

export default PopupDeletePack;
