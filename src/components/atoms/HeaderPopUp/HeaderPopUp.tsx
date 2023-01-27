import React, {FC} from 'react';
import styles from "../CardBasisWrapper/CardBasisWrapper.module.scss";

type HeaderPopUpType = {
    title: string;
    onClose: () => void
}

const HeaderPopUp: FC<HeaderPopUpType> = ( {title, onClose}) => {
    return (
        <div className={styles.wrapper}>
            <div onClick={onClose}/>
            {title}
        </div>
    );
};

export default HeaderPopUp;