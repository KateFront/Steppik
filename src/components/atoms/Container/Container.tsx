import styles from './Container.module.scss';
import React, { FC } from 'react';

type ContainerType = {
    children: React.ReactNode;
    customStyles?: string;
};

const Container: FC<ContainerType> = ({ children, customStyles }) => {
    const containerStyles = `${styles.container} ${customStyles}`;
    return <div className={containerStyles}>{children}</div>;
};

export default Container;
