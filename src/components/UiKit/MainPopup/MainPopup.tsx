import React, {FC} from 'react';
import OverlayingPopup from "../OverlayingPopup/OverlayingPopup";
import styles from './MainPopup.module.scss';
import classNames from "classnames";
import HeaderPopUp from "../../atoms/HeaderPopUp/HeaderPopUp";
import Portal from "../Portal/Portal";

type MainPopupType = {
    isOpened: boolean,
    title: string,
    onClose: () => void,
    className?: string,
    children?: React.ReactNode
}

const MainPopup: FC<MainPopupType> = ({isOpened, title, onClose, className, children}) => {
    return (
        <Portal>
            <OverlayingPopup isOpened={isOpened} onClose={onClose}>
                <div className={classNames(styles.container, className)}>
                    <HeaderPopUp
                        title={title}
                        onClose={onClose}/>
                    {children}
                </div>
            </OverlayingPopup>
        </Portal>
    );
};

export default MainPopup;