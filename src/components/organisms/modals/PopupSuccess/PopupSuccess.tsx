import React, {FC} from 'react';
import styles from "./PopupSuccess.module.scss";
import Button from "../../../atoms/Button/Button";

type PopupType = {
    onClick: () => void
}

const PopupSuccess: FC<PopupType> = ({onClick}) => {
    return (
        <div className={styles.popupBox}>
            <div className={styles.popupWrapper}>
                <span>SUCCESS</span>
            </div>
            <div className={styles.popupText}>
                Congratulations, your account has been successfully created.
            </div>
            <div className={styles.btn}>
                <Button onClick={onClick} name={'Continue'} isDisabled={false}/>
            </div>
        </div>
    );
};

export default PopupSuccess;