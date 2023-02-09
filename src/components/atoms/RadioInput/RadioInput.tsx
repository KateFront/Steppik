import React from 'react';
import styles from './RadioInput.module.scss';

interface RadioInputProps {
    options: { value: string; label: string }[];
    value: string;
    onChange: (value: string) => void;
}

const RadioInput: React.FC<RadioInputProps> = ({ options, value, onChange }) => {
    return (
        <div className={styles.inputWrapper}>
            {options.map((option) => (
                <label key={option.value}>
                    <input
                        type="radio"
                        value={option.value}
                        checked={value === option.value}
                        onChange={(e) => onChange(e.target.value)}
                    />
                    {option.label}
                </label>
            ))}
        </div>
    );
};

export default RadioInput;
