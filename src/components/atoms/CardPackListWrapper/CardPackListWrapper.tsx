import React, {FC} from 'react';
import styles from "./CardPackListWrapper.module.scss";

type CardPackListWrapperProps = {
    children: React.ReactNode;
    title: string;

};

const CardPackListWrapper: FC<CardPackListWrapperProps> = ({children, title}) => {
    return (
        <div>
            <div className={styles.packListWrapper}>
                <div className={styles.titlePackWrapper}>
                    <span>{title}</span>
                </div>
                {children}
            </div>
        </div>
    );
};

export default CardPackListWrapper;