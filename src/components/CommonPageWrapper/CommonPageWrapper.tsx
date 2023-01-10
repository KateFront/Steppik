import styles from './CommonPageWrapper.module.scss'
import React from "react";

type CommonPageWrapperProps = {
    children: React.ReactNode;
};

const CommonPageWrapper = (props: CommonPageWrapperProps) => {
    return <div className={styles.wrapper}>
        {props.children}
    </div>
}

export default CommonPageWrapper;