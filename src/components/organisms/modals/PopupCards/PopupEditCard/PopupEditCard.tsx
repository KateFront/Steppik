import React, { FC } from 'react';
import styles from './PopupEditCard.module.scss';
import Button from '../../../../atoms/Button/Button';
import Input from '../../../../atoms/Input/Input';
import { useAppDispatch } from '../../../../../store/store';
import { updatePacksTC } from '../../../../../store/pack-reducer';
import MainPopup from '../../MainPopup/MainPopup';
import { SubmitHandler, useForm } from 'react-hook-form';

type PopupPropsType = {
    children?: React.ReactNode;
    active: boolean;
    setActive: (active: boolean) => void;
    onClose: () => void;
};

type PopupFieldsType = {
    name: string;
};

const PopupEditCard: FC<PopupPropsType> = ({ setActive, onClose }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<PopupFieldsType>();
    const dispatch = useAppDispatch();

    const saveNewPack = (name: string) => {
        dispatch(updatePacksTC({ name }));
        setActive(false);
    };

    const onSubmit: SubmitHandler<PopupFieldsType> = (data) => {
        saveNewPack(data.name);
    };

    return (
        <MainPopup onClose={onClose} title={'Edit card'}>
            <div className={` ${styles.modal}`}>
                <div className={`${styles.modalContent}`} onClick={(event) => event.stopPropagation()}>
                    <div className={styles.popupWrapper}>
                        <span>Edit card</span>
                    </div>
                    <div className={styles.inputWrapper}>
                        <Input
                            label={'Name pack'}
                            typeInput={'text'}
                            addProps={{
                                ...register('name', {
                                    required: true,
                                    minLength: { value: 8, message: 'Name too short' },
                                    maxLength: { value: 14, message: 'Name too long' },
                                }),
                            }}
                            error={errors.name?.message}
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

export default PopupEditCard;
