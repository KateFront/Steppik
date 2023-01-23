import React, {FC} from 'react';
import styles from './RectangleButton.module.scss'


export type ButtonProps = {
    onClick?: () => void;
    isDisabled: boolean;
    name: string;
    type: 'primary' | 'secondary';
};

const RectangleButton: FC<ButtonProps> = ({isDisabled, name, onClick,type}) => {

    const disabledBtnStyles = `${isDisabled ? styles.disabled : ''}`;

    return (
        <div className={`${type === ("primary" || "secondary") ? styles.primary : styles.secondary}  ${disabledBtnStyles}`}
             onClick={onClick}>
            {name}
        </div>
    );
};

export default RectangleButton;//