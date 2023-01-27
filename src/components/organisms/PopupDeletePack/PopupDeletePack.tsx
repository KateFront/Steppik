import React, {FC} from 'react';
import styles from "./PopupDeletePack.module.scss";
import Button from "../../atoms/Button/Button";
import {useAppDispatch} from "../../../store/store";
import {deletePackTC} from "../../../store/pack-reducer";
import MainPopup from "../../UiKit/MainPopup/MainPopup";
import {SubmitHandler, useForm} from "react-hook-form";

type PopupNewPackPropsType = {
    children?: React.ReactNode;
    active: boolean,
    setActive: (active: boolean) => void,
    onClose: () => void;
}

type PopupFieldsType = {
    id: string
}

const PopupDeletePack: FC<PopupNewPackPropsType> = ({active, setActive, onClose}) => {
    const {register, handleSubmit, control, formState: {errors}} = useForm<PopupFieldsType>();
    const dispatch = useAppDispatch();

    const saveNewPack = (packId: string) => {
        dispatch(deletePackTC(packId));
        setActive(false);
    }

    const onSubmit: SubmitHandler<PopupFieldsType> = (data) => {
        saveNewPack(data.id);
    }

    return (
        <MainPopup isOpened={active} onClose={onClose} title={'Delete pack'}>
            <div className={` ${styles.modal}`}>
                <div className={`${styles.modalContent}`}
                     onClick={event => event.stopPropagation()}>
                    <div className={styles.popupWrapper}>
                        <span>Delete pack</span>
                    </div>
                    <div className={styles.popupSpanWrapper}>
                        <span>Do you really want to remove Pack Name - Name Pack?</span>
                        <span>  All cards will be deleted.  </span>
                    </div>
                    <div className={styles.btn}>
                        <div className={styles.btnLeft}>
                            <Button onClick={() => setActive(false)} name={'Cancel'} isDisabled={true}/></div>
                        <div className={styles.btnRight}>
                            <Button onClick={handleSubmit(onSubmit)} name={'Delete'} isDisabled={false}/>
                        </div>
                    </div>
                </div>
            </div>
        </MainPopup>
    );
};

export default PopupDeletePack;
