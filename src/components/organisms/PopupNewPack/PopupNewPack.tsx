import React, {FC} from 'react';
import styles from "./PopupNewPack.module.scss";
import Button from "../../atoms/Button/Button";
import Input from "../../atoms/Input/Input";
import {useAppDispatch} from "../../../store/store";
import {createNewPacksTC} from "../../../store/pack-reducer";
import MainPopup from "../../UiKit/MainPopup/MainPopup";

type PopupType = {
    children?: React.ReactNode;
    active: boolean,
    setActive: (active: boolean) => void,
    onClose: () => void;
}

const PopupNewPack: FC<PopupType> = ({active, setActive, onClose}) => {

    const dispatch = useAppDispatch();

    const saveNewPack = () => {
        dispatch(createNewPacksTC({cardsPack: {name: '123123123k'}}));
        setActive(false);
    }

    return (
        <MainPopup isOpened={active} onClose={onClose} title={'Add new pack'} >
            <div className={` ${styles.modal}`}>
                <div className={`${styles.modalContent}`}
                     onClick={event => event.stopPropagation()}>
                    <div className={styles.popupWrapper}>
                        <span>Add new pack</span>
                    </div>
                    <div className={styles.inputWrapper}>
                        <Input label={'Name pack'} typeInput={'text'}/>
                    </div>
                    <div className={styles.btn}>
                        <div className={styles.btnLeft}>
                            <Button onClick={() => setActive(false)} name={'Cancel'} isDisabled={true}/></div>
                        <div className={styles.btnRight}>
                            <Button onClick={saveNewPack} name={'Save'} isDisabled={false}/>
                        </div>
                    </div>
                </div>
            </div>
        </MainPopup>
    );
};

export default PopupNewPack;
