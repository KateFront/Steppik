import React, { FC } from 'react';
import styles from './Button.module.scss';
import classnames from 'classnames';
import Icon, { IconType } from '../Icon/Icon';

type BtnTypes = 'primary' | 'secondary' | 'dangerous';

export type ButtonProps = {
    onClick?: () => void;
    isDisabled?: boolean;
    name?: string;
    type?: BtnTypes;
    iconType?: IconType;
    className?: string;
};

const Button: FC<ButtonProps> = ({ className, isDisabled, name, onClick, type = 'primary', iconType }) => {
    return (
        <div
            className={classnames(styles.btn, `${className}`, {
                [styles.disabled]: isDisabled,
                [styles.primary]: type === 'primary',
                [styles.secondary]: type === 'secondary',
                [styles.dangerous]: type === 'dangerous',
            })}
            onClick={onClick}
        >
            {iconType && <Icon type={iconType} />}
            {name}
        </div>
    );
};

export default Button;
