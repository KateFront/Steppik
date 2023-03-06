import React, { FC } from 'react';
import Cover from '../../../../../../molecules/Cover/Cover';
import styles from './VideoInputs.module.scss';

type VideoFileInputsProps = {
    videoAnswer: string;
    videoQuestion: string;
    onChangeQuestion: (file: string) => void;
    onChangeAnswer: (file: string) => void;
};

const VideoInputs: FC<VideoFileInputsProps> = ({ videoAnswer, videoQuestion, onChangeQuestion, onChangeAnswer }) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.questionWrapper}>
                <Cover picture={videoQuestion} onChange={onChangeQuestion} title={'Question:'} />
            </div>

            <Cover picture={videoAnswer} onChange={onChangeAnswer} title={'Answer:'} />
        </div>
    );
};

export default VideoInputs;
