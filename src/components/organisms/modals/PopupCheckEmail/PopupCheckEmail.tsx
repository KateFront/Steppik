import React, {FC} from 'react';
import styles from "./PopupCheckEmail.module.scss";
import CardBasisWrapper from "../../../atoms/CardBasisWrapper/CardBasisWrapper";
import checkEmail from '../../../../assets/Icons/checkEmail.svg'
import Button from "../../../atoms/Button/Button";

type PopupType = {
    onClick: () => void
}

const PopupCheckEmail: FC<PopupType> = ({onClick}) => {
    return (
        <CardBasisWrapper title={'It-incubator'}>
            <div className={styles.popupImg}>
                <img src={checkEmail} alt="img"/>
            </div>
            <div className={styles.popupWrapper}>
                <span>Check Email</span>
            </div>
            <div className={styles.popupText}>
                We’ve sent an Email with instructions to example@mail.com
            </div>
            <div className={styles.btn}>
                <Button onClick={onClick} name={'Continue'} isDisabled={false}/>
            </div>
        </CardBasisWrapper>

    );
};

export default PopupCheckEmail;