import React, {FC} from 'react';
import styles from './OverlayingPopup.module.scss';

type OverlayingPopupType = {
    children: React.ReactNode;
    onClose: () => void;
    isOpened: boolean
}

const OverlayingPopup: FC<OverlayingPopupType> = ({children, onClose, isOpened}) => {
    return (
        <div className={styles.container} role={'dialog'}>
            <div className={styles.overlay}
                 role={'button'}
                 tabIndex={0}
                 onClick={onClose}/>
            {children}
        </div>
    );
};

export default OverlayingPopup;