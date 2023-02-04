import React, { FC } from 'react';
import classNames from 'classnames';

import OverlayingPopup from '../OverlayingPopup/OverlayingPopup';
import HeaderPopUp from '../../../atoms/HeaderPopUp/HeaderPopUp';
import Portal from '../../../atoms/Portal/Portal';

import styles from './MainPopup.module.scss';

type MainPopupType = {
    title: string;
    onClose: () => void;
    className?: string;
    children?: React.ReactNode;
};

const MainPopup: FC<MainPopupType> = ({ title, onClose, className, children }) => {
    return (
        <Portal>
            <OverlayingPopup onClose={onClose}>
                <div className={classNames(styles.container, className)}>
                    <HeaderPopUp title={title} onClose={onClose} />
                    {children}
                </div>
            </OverlayingPopup>
        </Portal>
    );
};

export default MainPopup;
