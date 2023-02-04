import React, { FC } from 'react';

import Input from '../../../atoms/Input/Input';
import { useAppDispatch, useAppSelector } from '../../../../store/store';
import MainPopup from '../MainPopup/MainPopup';
import { SubmitHandler, useForm } from 'react-hook-form';

import styles from './PopupNewCard.module.scss';
import { createNewCardsTC } from '../../../../store/card-reducer';
import Button from '../../../atoms/Button/Button';

type PopupNewPackPropsType = {
    children?: React.ReactNode;
    setActive: (active: boolean) => void;
    onClose: () => void;
};

type PopupFieldsType = {
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

    const saveNewPack = (question: string, answer: string) => {
        if (packId !== null) {
            dispatch(createNewCardsTC({ card: { cardsPack_id: packId, answer, question } }));
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
                    <div className={styles.inputWrapper}>
                        <Input
                            label={'Question'}
                            typeInput={'text'}
                            addProps={{
                                ...register('question', {
                                    required: true,
                                    minLength: { value: 8, message: 'Name too short' },
                                    maxLength: { value: 14, message: 'Name too long' },
                                }),
                            }}
                            error={errors.question?.message}
                        />

                        <Input
                            label={'Answers'}
                            typeInput={'text'}
                            addProps={{
                                ...register('answer', {
                                    required: true,
                                    minLength: { value: 8, message: 'Name too short' },
                                    maxLength: { value: 14, message: 'Name too long' },
                                }),
                            }}
                            error={errors.answer?.message}
                        />
                    </div>
                    <div className={styles.btn}>
                        <div className={styles.btnLeft}>
                            <Button onClick={() => setActive(false)} name={'Cancel'} isDisabled={true} />
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
