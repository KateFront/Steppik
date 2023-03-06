import React, { FC, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../store/store';
import MainPopup from '../../MainPopup/MainPopup';
import { SubmitHandler, useForm } from 'react-hook-form';

import styles from './PopupNewCard.module.scss';
import { createNewCardsTC } from '../../../../../store/card-reducer';
import Button from '../../../../atoms/Button/Button';
import { SelectInput } from '../../../../atoms/Select/SelectInput';
import TextInputs from './moleculs/TextInputs/TextInputs';
import PictureFileInputs from './moleculs/PictureInputs/PictureFileInputs';
import defaultCover from '../../../../../assets/img/defaultCover.jpg';
import VideoInputs from './moleculs/VideoInputs/VideoInputs';

type PopupNewPackPropsType = {
    children?: React.ReactNode;
    setActive: (active: boolean) => void;
    onClose: () => void;
};

export type PopupFieldsType = {
    question: string;
    answer: string;
};

const PopupNewCard: FC<PopupNewPackPropsType> = ({ setActive, onClose }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<PopupFieldsType>();
    const dispatch = useAppDispatch();

    const packId = useAppSelector((state) => state.pack.activePackId);

    const [value, setValue] = useState('1');

    const [pictureAnswer, setPictureAnswer] = useState(defaultCover);
    const [pictureQuestion, setPictureQuestion] = useState(defaultCover);

    const [videoAnswer, setVideoAnswer] = useState(defaultCover);
    const [videoQuestion, setVideoQuestion] = useState(defaultCover);

    const saveNewPack = (question: string, answer: string) => {
        const answerImg = pictureAnswer === defaultCover ? undefined : pictureAnswer;
        const questionImg = pictureQuestion === defaultCover ? undefined : pictureQuestion;

        const questionVideo = videoQuestion === defaultCover ? undefined : videoQuestion;
        const answerVideo = videoAnswer === defaultCover ? undefined : videoAnswer;

        if (packId !== null) {
            dispatch(
                createNewCardsTC({
                    card: { cardsPack_id: packId, answer, question, answerImg, questionImg, answerVideo, questionVideo },
                })
            );
            setActive(false);
        }
    };

    const onSubmit: SubmitHandler<PopupFieldsType> = (data) => {
        saveNewPack(data.question, data.answer);
    };

    return (
        <MainPopup onClose={onClose} title={'Add new pack'}>
            <div className={` ${styles.modal}`}>
                <div className={`${styles.modalContent}`}>
                    <div className={styles.popupWrapper}>
                        <span>Add new card</span>
                    </div>
                    <div className={styles.selectTextWrapper}>Choose a question format</div>
                    <SelectInput
                        value={value}
                        onChange={setValue}
                        items={[
                            { value: '1', title: 'Text' },
                            { value: '2', title: 'Video' },
                            { value: '3', title: 'Picture' },
                        ]}
                    />
                    {value === '1' && <TextInputs errors={errors} register={register} />}

                    {value === '3' && (
                        <PictureFileInputs
                            pictureAnswer={pictureAnswer}
                            onChangeAnswer={setPictureAnswer}
                            onChangeQuestion={setPictureQuestion}
                            pictureQuestion={pictureQuestion}
                        />
                    )}
                    {value === '2' && (
                        <VideoInputs
                            videoAnswer={videoAnswer}
                            onChangeAnswer={setVideoAnswer}
                            onChangeQuestion={setVideoQuestion}
                            videoQuestion={videoQuestion}
                        />
                    )}

                    <div className={styles.btn}>
                        <div className={styles.btnLeft}>
                            <Button onClick={() => setActive(false)} name={'Cancel'} isDisabled={true} type={'secondary'} />
                        </div>
                        <div className={styles.btnRight}>
                            <Button onClick={handleSubmit(onSubmit)} name={'Save'} isDisabled={false} />
                        </div>
                    </div>
                </div>
            </div>
        </MainPopup>
    );
};

export default PopupNewCard;
