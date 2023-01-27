import React, {FC} from 'react';
import styles from "./PopupNewPack.module.scss";
import Button from "../../atoms/Button/Button";
import Input from "../../atoms/Input/Input";
import {useAppDispatch} from "../../../store/store";
import {createNewPacksTC} from "../../../store/pack-reducer";
import MainPopup from "../../UiKit/MainPopup/MainPopup";
import {SubmitHandler, useForm} from "react-hook-form";

type PopupNewPackPropsType = {
    children?: React.ReactNode;
    active: boolean,
    setActive: (active: boolean) => void,
    onClose: () => void;
}

type PopupFieldsType = {
    packName: string,
}


const PopupNewPack: FC<PopupNewPackPropsType> = ({active, setActive, onClose}) => {
    const {register, handleSubmit, control, formState: {errors}} = useForm<PopupFieldsType>();
    const dispatch = useAppDispatch();

    const saveNewPack = (name: string) => {
        dispatch(createNewPacksTC({cardsPack: {name: name}}));
        setActive(false);
    }

    const onSubmit: SubmitHandler<PopupFieldsType> = (data) => {
        saveNewPack(data.packName);
    }

    return (
        <MainPopup isOpened={active} onClose={onClose} title={'Add new pack'}>
            <div className={` ${styles.modal}`}>
                <div className={`${styles.modalContent}`}
                     onClick={event => event.stopPropagation()}>
                    <div className={styles.popupWrapper}>
                        <span>Add new pack</span>
                    </div>
                    <div className={styles.inputWrapper}>
                        <Input label={'Name pack'} typeInput={'text'} addProps={{
                            ...register("packName", {
                                required: true,
                                minLength: {value: 8, message: 'Name too short'},
                                maxLength: {value: 14, message: 'Name too long'}
                            })

                        }} error={errors.packName?.message}/>
                    </div>
                    <div className={styles.btn}>
                        <div className={styles.btnLeft}>
                            <Button onClick={() => setActive(false)} name={'Cancel'} isDisabled={true}/></div>
                        <div className={styles.btnRight}>
                            <Button onClick={handleSubmit(onSubmit)} name={'Save'} isDisabled={false}/>
                        </div>
                    </div>
                </div>
            </div>
        </MainPopup>
    );
};

export default PopupNewPack;
