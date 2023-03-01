import React, { FC } from 'react';
import styles from './PopupDeleteCard.module.scss';
import Button from '../../../../atoms/Button/Button';
import { useAppDispatch } from '../../../../../store/store';
import MainPopup from '../../MainPopup/MainPopup';
import { deleteCardsTC } from '../../../../../store/card-reducer';

type PopupNewPackPropsType = {
    children?: React.ReactNode;
    active: boolean;
    setActive: (active: boolean) => void;
    onClose: () => void;
};

const PopupDeleteCard: FC<PopupNewPackPropsType> = ({ setActive, onClose }) => {
    const dispatch = useAppDispatch();

    const deletePack = () => {
        dispatch(deleteCardsTC());
        setActive(false);
    };

    return (
        <MainPopup onClose={onClose} title={'Delete card'}>
            <div className={` ${styles.modal}`}>
                <div className={`${styles.modalContent}`}>
                    <div className={styles.popupWrapper}>
                        <span>Delete card</span>
                    </div>
                    <div className={styles.popupSpanWrapper}>
                        <span>Do you really want to remove Pack Name - Name Pack?</span>
                        <span> All cards will be deleted. </span>
                    </div>
                    <div className={styles.btn}>
                        <div className={styles.btnLeft}>
                            <Button onClick={() => setActive(false)} name={'Cancel'} isDisabled={true} type={'secondary'} />
                        </div>
                        <div className={styles.btnRight}>
                            <Button onClick={deletePack} name={'Delete'} isDisabled={false} type={'dangerous'} />
                        </div>
                    </div>
                </div>
            </div>
        </MainPopup>
    );
};

export default PopupDeleteCard;
