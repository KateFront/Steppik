import React, { FC, useState } from 'react';
import styles from './SelectAction.module.scss';

export type SelectOption = {
    label: string;
    value: string;
};

type SelectActionProps = {
    options: SelectOption[];
    value?: SelectOption;
    onChange: (value: SelectOption | undefined) => void;
};

export const SelectAction: FC<SelectActionProps> = ({ options, value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const clearOptions = () => {
        onChange(undefined);
    };
    const selectOption = (option: SelectOption) => {
        onChange(option);
    };
    return (
        <div
            onClick={() => setIsOpen((prevState) => !prevState)}
            tabIndex={0}
            onBlur={() => setIsOpen(false)}
            className={styles.container}
        >
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    clearOptions();
                }}
            >
                &times;
            </button>
            <span>{value?.label}</span>
            <select className={`${styles.options} ${isOpen ? styles.show : ''}`}>
                {options.map((option) => (
                    <option
                        key={option.label}
                        onClick={(e) => {
                            e.stopPropagation();
                            selectOption(option);
                            setIsOpen(false);
                        }}
                    >
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};
export default SelectAction;
