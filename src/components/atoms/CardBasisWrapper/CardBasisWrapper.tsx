import React, {FC} from 'react';
import styles from './CardBasisWrapper.module.scss';

type CardBasisWrapperProps = {
    children: React.ReactNode;
    title: string;
};

const CardBasisWrapper: FC<CardBasisWrapperProps> = ({children, title}) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.titleWrapper}>
                <span>{title}</span>
            </div>
            {children}
        </div>

    );
};

export default CardBasisWrapper;