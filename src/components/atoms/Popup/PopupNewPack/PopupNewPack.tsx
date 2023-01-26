import React, {FC} from 'react';
import styles from "./PopupNewPack.module.scss";
import Button from "../../Button/Button";
import Input from "../../Input/Input";
import {useAppDispatch} from "../../../../store/store";
import {createNewPacksTC} from "../../../../store/pack-reducer";

type PopupType = {
    children?: React.ReactNode;
    active: boolean,
    setActive: (active: boolean) => void
}

const PopupNewPack: FC<PopupType> = ({active, setActive}) => {

    const dispatch = useAppDispatch();

    const saveNewPack = () => {
        setActive(true);
        dispatch(createNewPacksTC({cardsPack: {name: '123123123k'}}));
    }

    return (
        <div className={` ${active ? styles.modalActive : styles.modal}` }>
            <div className={`${active ? styles.modalContentActive : styles.modalContent}`}
                 onClick={event => event.stopPropagation()}>
                <div className={styles.popupWrapper}>
                    <span>Add new pack</span>
                </div>
                <div className={styles.inputWrapper}>
                    <Input label={'Name pack'} typeInput={'text'}/>
                </div>
                <div className={styles.btn}>
                    <div className={styles.btnLeft}>
                        <Button onClick={()=> setActive(false)} name={'Cancel'} isDisabled={true}/></div>
                    <div className={styles.btnRight}>
                        <Button onClick={saveNewPack} name={'Save'} isDisabled={false}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PopupNewPack;