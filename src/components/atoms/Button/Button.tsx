import React, {FC} from 'react';
import styles from './Button.module.scss'


export type ButtonProps = {
    onClick?: () => void;
    isDisabled: boolean;
    name: string;
};

const Button: FC<ButtonProps> = ({isDisabled, name, onClick}) => {

    const disabledBtnStyles = `${isDisabled ? styles.disabled : ''}`;

    return (
        <div>
            <button className={`${styles.btn} ${disabledBtnStyles}`}
                    onClick={onClick}
                    disabled={isDisabled}>
                {name}
            </button>
        </div>
    );
};

export default Button;