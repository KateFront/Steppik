import React, { FC } from 'react';
import styles from './Cover.module.scss';
import { InputTypeFile } from '../../atoms/InputTypeFile/InputTypeFile';

type CoverType = {
    title: string;
    picture: string;
    onChange: (file: string) => void;
};

const Cover: FC<CoverType> = ({ title, onChange, picture }) => {
    const onChangeHandler = (file: File) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            onChange(reader.result as string);
        };
    };
    return (
        <div className={styles.wrapper}>
            <div className={styles.topWrapper}>
                <span className={styles.title}>{title}</span>
                <InputTypeFile onChange={onChangeHandler} linkText={'Change cover'} />
            </div>

            <div className={styles.imgWrapper}>
                <img src={picture} alt="cover" />
            </div>
        </div>
    );
};

export default Cover;
