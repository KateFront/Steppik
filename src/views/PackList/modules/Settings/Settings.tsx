import React, {FC} from 'react';
import styles from './Settings.module.scss';
import Switch from "../../../../components/atoms/Switch/Switch";

type SettingsPropsType = {
    switchOn: boolean;
    setSwitchOn: (value: boolean) => void;
};

const Settings: FC<SettingsPropsType> = ({switchOn,setSwitchOn}) => {

    return (
        <div>
            <div className={styles.boxWrapper}>
                <div className={styles.titleWrapper}>
                    <span>Show packs cards</span>
                </div>
                <Switch onChange={setSwitchOn} isFirstBtnActive={switchOn}/>
            </div>
            <div>
                <div className={styles.titleWrapper}>
                    <span>Number of cards</span>
                </div>
                <div>
                    <input type="range"/>

                </div>
            </div>
        </div>
    );
};

export default Settings;