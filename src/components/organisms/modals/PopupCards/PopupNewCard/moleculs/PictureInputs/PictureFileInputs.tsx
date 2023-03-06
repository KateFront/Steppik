import React, { FC } from 'react';
import Cover from '../../../../../../molecules/Cover/Cover';
import styles from './PictureFileInputs.module.scss';

type PictureFileInputsProps = {
    pictureAnswer: string;
    pictureQuestion: string;
    onChangeQuestion: (file: string) => void;
    onChangeAnswer: (file: string) => void;
};

const PictureFileInputs: FC<PictureFileInputsProps> = ({ pictureAnswer, pictureQuestion, onChangeQuestion, onChangeAnswer }) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.questionWrapper}>
                <Cover picture={pictureQuestion} onChange={onChangeQuestion} title={'Question:'} />
            </div>

            <Cover picture={pictureAnswer} onChange={onChangeAnswer} title={'Answer:'} />
        </div>
    );
};

export default PictureFileInputs;
