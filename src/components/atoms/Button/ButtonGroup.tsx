import React, {FC} from "react";
import styles from "./ButtonGroup.module.scss"
import Button, {ButtonProps} from './Button';

type ButtonsGroupProps = {
    btns: ButtonProps[];
}

const ButtonGroup: FC<ButtonsGroupProps> = ({btns}) => {

    return (
        <div className={styles.buttonsGroup}>
            {btns.map((btn, index)=>{
                return <Button key={index} isDisabled={btn.isDisabled} onClick={btn.onClick} name={btn.name}/>;
            })}
        </div>
    )
}
export default ButtonGroup;