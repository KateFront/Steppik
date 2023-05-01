import React, { FC, useState } from 'react';
import styles from './PopupEditCard.module.scss';
import Button from '../../../../atoms/Button/Button';
import { useAppDispatch, useAppSelector } from '../../../../../store/store';
import MainPopup from '../../MainPopup/MainPopup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { SelectInput } from '../../../../atoms/Select/SelectInput';
import TextInputs from '../PopupNewCard/moleculs/TextInputs/TextInputs';
import PictureFileInputs from '../PopupNewCard/moleculs/PictureInputs/PictureFileInputs';
import defaultCover from '../../../../../assets/img/defaultCover.jpg';
import { updateCardTC } from '../../../../../store/card-reducer';

type PopupPropsType = {
    children?: React.ReactNode;
    active: boolean;
    setActive: (active: boolean) => void;
    onClose: () => void;
};

type PopupFieldsType = {
    question: string;
    answer: string;
};

const PopupEditCard: FC<PopupPropsType> = ({ setActive, onClose }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<PopupFieldsType>();

    const dispatch = useAppDispatch();

    const [value, setValue] = useState('1');

    const cardId = useAppSelector((state) => state.card.activeCardId);
    const [pictureAnswer, setPictureAnswer] = useState(defaultCover);
    const [pictureQuestion, setPictureQuestion] = useState(defaultCover);

    /*  const [videoAnswer, setVideoAnswer] = useState(defaultCover);
    const [videoQuestion, setVideoQuestion] = useState(defaultCover);*/

    const saveNewCard = (question: string, answer: string) => {
        const answerImg = pictureAnswer === defaultCover ? null : pictureAnswer;
        const questionImg = pictureQuestion === defaultCover ? null : pictureQuestion;

        if (cardId !== null) {
            dispatch(
                updateCardTC({
                    card: { _id: cardId, answer, question, answerImg, questionImg },
                })
            );
            setActive(false);
        }
    };

    const onSubmit: SubmitHandler<PopupFieldsType> = (data) => {
        saveNewCard(data.question, data.answer);
    };

    return (
        <MainPopup onClose={onClose} title={'Edit card'}>
            <div className={` ${styles.modal}`}>
                <div className={`${styles.modalContent}`} onClick={(event) => event.stopPropagation()}>
                    <div className={styles.popupWrapper}>
                        <span>Edit card</span>
                    </div>
                    <div className={styles.selectTextWrapper}>Choose a question format</div>
                    <SelectInput
                        value={value}
                        onChange={setValue}
                        items={[
                            { value: '1', title: 'Text' },
                            { value: '2', title: 'Picture' },
                        ]}
                    />
                    {value === '1' && <TextInputs errors={errors} register={register} />}

                    {value === '2' && (
                        <PictureFileInputs
                            pictureAnswer={pictureAnswer}
                            onChangeAnswer={setPictureAnswer}
                            onChangeQuestion={setPictureQuestion}
                            pictureQuestion={pictureQuestion}
                        />
                    )}
                    {/* {value === '2' && (
                        <VideoInputs
                            videoAnswer={videoAnswer}
                            onChangeAnswer={setVideoAnswer}
                            onChangeQuestion={setVideoQuestion}
                            videoQuestion={videoQuestion}
                        />
                    )}*/}
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

export default PopupEditCard;
