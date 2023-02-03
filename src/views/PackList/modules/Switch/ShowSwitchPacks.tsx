import React, {FC} from 'react';
import Switch from "../../../../components/atoms/Switch/Switch";
import styles from './Settings.module.scss'

type SettingsPropsType = {
    switchOn: boolean;
    setSwitchOn: (value: boolean) => void;
};

const ShowSwitchPacks: FC<SettingsPropsType> = ({switchOn,setSwitchOn}) => {

    return (
        <div>
            <div className={styles.boxWrapper}>
                <div className={styles.titleWrapper}>
                    <span>Show packs cards</span>
                </div>
                <Switch onChange={setSwitchOn} isFirstBtnActive={switchOn}/>
            </div>

        </div>
    );
};

export default ShowSwitchPacks;//