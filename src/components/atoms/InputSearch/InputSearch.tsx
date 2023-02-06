import React, { FC } from 'react';
import styles from './InputSearch.module.scss';
import Search from '../../../assets/Icons/search.svg';

type InputSearchProps = {
    value?: string;
    onChange?: (value: string) => void;
    placeholder: string;
};

const InputSearch: FC<InputSearchProps> = ({ value, onChange, placeholder }) => {
    return (
        <div>
            <div className={styles.inputSearchField}>
                <input
                    className={styles.textSearchFiled}
                    type={'search'}
                    value={value}
                    placeholder={placeholder}
                    onChange={(event) => onChange?.(event.target.value)}
                />
                <img src={Search} alt="search" className={styles.imgWrapper} />
            </div>
        </div>
    );
};

export default InputSearch;
