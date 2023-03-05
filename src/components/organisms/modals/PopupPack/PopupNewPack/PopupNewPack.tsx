import React, { FC, useState } from 'react';

import Button from '../../../../atoms/Button/Button';
import Input from '../../../../atoms/Input/Input';
import { useAppDispatch } from '../../../../../store/store';
import { createNewPacksTC } from '../../../../../store/pack-reducer';
import MainPopup from '../../MainPopup/MainPopup';
import { SubmitHandler, useController, useForm } from 'react-hook-form';

import styles from './PopupNewPack.module.scss';
import Checkbox from '../../../../atoms/CheckBox/Checkbox';
import { InputTypeFile } from '../../../../atoms/InputTypeFile/InputTypeFile';

import defaultCover from '../../../../../assets/img/defaultCover.jpg';

type PopupNewPackPropsType = {
    children?: React.ReactNode;
    setActive: (active: boolean) => void;
    onClose: () => void;
};

type PopupFieldsType = {
    packName: string;
    privatePack: boolean;
};

const PopupNewPack: FC<PopupNewPackPropsType> = ({ setActive, onClose }) => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<PopupFieldsType>();
    const dispatch = useAppDispatch();

    const [picture, setPicture] = useState(defaultCover);

    const saveNewPack = (name: string, deckCover: string | undefined, isPrivate?: boolean) => {
        dispatch(createNewPacksTC({ cardsPack: { name, deckCover, isPrivate } }));
        setActive(false);
    };

    const onSubmit: SubmitHandler<PopupFieldsType> = (data) => {
        saveNewPack(data.packName, picture === defaultCover ? undefined : picture, data.privatePack);
    };
    const { field } = useController({
        name: 'privatePack',
        control,
    });

    const onChangeHandler = (file: File) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            console.log(reader.result);
            setPicture(reader.result as string);
        };
    };

    return (
        <MainPopup onClose={onClose} title={'Add new pack'}>
            <div className={` ${styles.modal}`}>
                <div className={`${styles.modalContent}`}>
                    <div className={styles.popupWrapper}>
                        <span>Add new pack</span>
                    </div>
                    <div>
                        <span>Cover</span>
                        <InputTypeFile onChange={onChangeHandler} linkText={'Change cover'} />
                    </div>
                    <div className={styles.imgWrapper}>
                        <img src={picture} alt="cover" />
                    </div>
                    <div className={styles.inputWrapper}>
                        <Input
                            label={'Name pack'}
                            typeInput={'text'}
                            addProps={{
                                ...register('packName', {
                                    required: true,
                                    minLength: { value: 4, message: 'Name too short' },
                                    maxLength: { value: 14, message: 'Name too long' },
                                }),
                            }}
                            error={errors.packName?.message}
                        />
                    </div>
                    <div className={styles.checkboxWrapper}>
                        <Checkbox addProps={{ ...register('privatePack') }} isChecked={field.value} />
                        <label htmlFor={'privatePack'} className={styles.checkboxLabel}>
                            Private pack
                        </label>
                    </div>
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

export default PopupNewPack;
