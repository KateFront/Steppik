import React, { FC } from 'react';
import s from './Checkbox.module.scss';

type CheckboxProps = {
    addProps?: object;
    isChecked: boolean;
};

const Checkbox: FC<CheckboxProps> = ({ isChecked, addProps }) => {
    return (
        <div className={`${s.inputWrapper} ${isChecked ? s.active : ''}`}>
            <input type={'checkbox'} className={s.checkbox} {...addProps} id={'rememberMe'} />
        </div>
    );
};

export default Checkbox;
