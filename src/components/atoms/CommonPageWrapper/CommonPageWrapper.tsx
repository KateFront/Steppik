import styles from './CommonPageWrapper.module.scss';
import React, { FC } from 'react';

type CommonPageWrapperProps = {
    children: React.ReactNode;
    customStyles?: string;
};

const CommonPageWrapper: FC<CommonPageWrapperProps> = ({ children, customStyles }) => {
    const commonPageWrapperStyles = `${styles.wrapper} ${customStyles}`;
    return <div className={commonPageWrapperStyles}>{children}</div>;
};

export default CommonPageWrapper;
