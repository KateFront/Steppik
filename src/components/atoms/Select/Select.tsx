import React, { FC } from 'react';
import styles from './Select.module.scss';

type SelectPropsType = {
    pageSize: number;
    onChange: (value: string) => void;
};
export const Select: FC<SelectPropsType> = ({ pageSize, onChange }) => {
    const range = [10, 15, 20];

    return (
        <div className={styles.filters}>
            <span className={styles.spanWrapper}>Show</span>
            <select value={pageSize} onChange={(e) => onChange(e.currentTarget.value)}>
                {range.map((option) => (
                    <option value={option} key={option}>
                        {option}
                    </option>
                ))}
            </select>
            <span className={styles.spanWrapper}>Cards per Page</span>
        </div>
    );
};
export default Select;
