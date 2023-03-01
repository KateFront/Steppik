import React, { FC } from 'react';
import Edit from '../../../assets/Icons/Edit.svg';
import Learn from '../../../assets/Icons/teacher.svg';
import Delete from '../../../assets/Icons/Delete.svg';
import LogOut from '../../../assets/Icons/logout.svg';
import styles from './Icon.module.scss';

export type IconType = 'Edit' | 'Learn' | 'Delete' | 'LogOut';

type iconsMapType = {
    [key in IconType]: string;
};

const iconsMap: iconsMapType = {
    Edit,
    Learn,
    Delete,
    LogOut,
};

const Icon: FC<{ type: IconType }> = ({ type }) => {
    return (
        <div className={styles.imgWrapper}>
            <img src={iconsMap[type]} alt="" />
        </div>
    );
};

export default Icon;
