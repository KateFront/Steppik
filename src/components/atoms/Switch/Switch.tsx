import React, { FC } from 'react';
import styles from './Switch.module.scss';

type SwitchPropsType = {
    isFirstBtnActive: boolean;
    onChange: (value: boolean) => void;
};

const Switch: FC<SwitchPropsType> = ({ isFirstBtnActive, onChange }) => {
    return (
        <div className={styles.switchWrapper}>
            <div
                className={`${styles.commonBtnStyles} ${isFirstBtnActive ? styles.active : ''}`}
                onClick={() => {
                    onChange(true);
                }}
            >
                My
            </div>
            <div
                className={`${styles.commonBtnStyles} ${isFirstBtnActive ? '' : styles.active}`}
                onClick={() => {
                    onChange(false);
                }}
            >
                All
            </div>
        </div>
    );
};

export default Switch;
