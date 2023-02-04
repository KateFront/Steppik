import React, { FC } from 'react';

import Button from '../../../atoms/Button/Button';
import Input from '../../../atoms/Input/Input';
import { useAppDispatch } from '../../../../store/store';
import { createNewPacksTC } from '../../../../store/pack-reducer';
import MainPopup from '../MainPopup/MainPopup';
import { SubmitHandler, useForm } from 'react-hook-form';

import styles from './PopupNewPack.module.scss';

type PopupNewPackPropsType = {
    children?: React.ReactNode;
    setActive: (active: boolean) => void;
    onClose: () => void;
};

type PopupFieldsType = {
    packName: string;
};

const PopupNewPack: FC<PopupNewPackPropsType> = ({ setActive, onClose }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<PopupFieldsType>();
    const dispatch = useAppDispatch();

    const saveNewPack = (name: string) => {
        dispatch(createNewPacksTC({ cardsPack: { name: name } }));
        setActive(false);
    };

    const onSubmit: SubmitHandler<PopupFieldsType> = (data) => {
        saveNewPack(data.packName);
    };

    return (
        <MainPopup onClose={onClose} title={'Add new pack'}>
            <div className={` ${styles.modal}`}>
                <div className={`${styles.modalContent}`}>
                    <div className={styles.popupWrapper}>
                        <span>Add new pack</span>
                    </div>
                    <div className={styles.inputWrapper}>
                        <Input
                            label={'Name pack'}
                            typeInput={'text'}
                            addProps={{
                                ...register('packName', {
                                    required: true,
                                    minLength: { value: 8, message: 'Name too short' },
                                    maxLength: { value: 14, message: 'Name too long' },
                                }),
                            }}
                            error={errors.packName?.message}
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

export default PopupNewPack;
