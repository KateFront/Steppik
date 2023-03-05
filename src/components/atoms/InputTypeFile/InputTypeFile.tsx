import React, { ChangeEvent, FC, useRef } from 'react';
import changeAvatar from '../../../assets/img/Group 61.svg';
import styles from './InputTypeFile.module.scss';

type InputType = {
    onChange: (file: File) => void;
    linkText?: string;
};

export const InputTypeFile: FC<InputType> = ({ onChange, linkText }) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const selectFileHandler = () => {
        inputRef && inputRef.current?.click();
    };

    const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e);
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0];
            onChange(file);
        }
    };

    return (
        <div>
            {linkText ? (
                <span className={styles.linkText} onClick={selectFileHandler}>
                    Change cover
                </span>
            ) : (
                <span onClick={selectFileHandler}>
                    {changeAvatar && <img src={changeAvatar} alt="uploaded image" className={styles.avatarWrapper} />}
                </span>
            )}
            <input type="file" accept="image/*" ref={inputRef} onChange={uploadHandler} style={{ display: 'none' }} />
        </div>
    );
};
