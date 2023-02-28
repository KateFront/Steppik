import React, { FC } from 'react';
import styles from './Button.module.scss';
import classnames from 'classnames';

type BtnTypes = 'primary' | 'secondary' | 'dangerous';

export type ButtonProps = {
    onClick?: () => void;
    isDisabled: boolean;
    name: string;
    type?: BtnTypes;
    imageUrl?: any;
};

const Button: FC<ButtonProps> = ({ isDisabled, name, onClick, type = 'primary' }) => {
    return (
        <div
            className={classnames(styles.btn, {
                [styles.disabled]: isDisabled,
                [styles.primary]: type === 'primary',
                [styles.secondary]: type === 'secondary',
                [styles.dangerous]: type === 'dangerous',
            })}
            onClick={onClick}
        >
            {name}
        </div>
    );
};

export default Button;
