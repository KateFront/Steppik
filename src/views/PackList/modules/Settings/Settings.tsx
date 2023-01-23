import React, {useState} from 'react';
import styles from './Settings.module.scss';
import Switch from "../../../../components/atoms/Switch/Switch";


const Settings = () => {
    const [switchOn, setSwitchOn] = useState(false);
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