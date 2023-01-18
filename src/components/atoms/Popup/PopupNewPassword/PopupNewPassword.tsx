import React, {FC} from 'react';
import styles from "./PopupNewPassword.module.scss";
import Button from "../../Button/Button";

type PopupType = {
    onClick: () => void
}

const PopupNewPassword: FC<PopupType> = ({onClick}) => {
    return (
        <div className={styles.popupBox}>
            <div className={styles.popupWrapper}>
                <span>SUCCESS</span>
            </div>
            <div className={styles.popupText}>
                Congratulations, your new password has been successfully created.
            </div>
            <div className={styles.btn}>
                <Button onClick={onClick} name={'Continue'} isDisabled={false}/>
            </div>
        </div>
    );
};

export default PopupNewPassword;