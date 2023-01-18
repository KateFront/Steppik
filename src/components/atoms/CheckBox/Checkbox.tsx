import React, {FC, useState} from 'react';
import s from "./Checkbox.module.scss";


const Checkbox: FC = () => {
    const [checked, setChecked] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    }

    return (
        <div className={s.inputWrapper}>
            <input type={'checkbox'}
                   checked={checked}
                   onChange={handleChange}
                   className={`${s.checkbox} ${checked ? s.active : ''}`}
            />
            <span className={s.text}>Remember me</span>
        </div>
    );

};

export default Checkbox;