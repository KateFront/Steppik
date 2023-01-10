import React from 'react';
import CommonPageWrapper from "../../../components/CommonPageWrapper/CommonPageWrapper";
import CardBasisWrapper from "../../../components/atoms/CardBasisWrapper/CardBasisWrapper";
import styles from './LoginPage.module.scss'
import LoginForm from "../LoginForm/LoginForm";

const LoginPage = () => {
    return (
        <CommonPageWrapper>
            <div className={styles.wrapper}>
                <CardBasisWrapper title={'It-incubator'}>
                    <LoginForm/>
                </CardBasisWrapper>
            </div>
        </CommonPageWrapper>
    );
};

export default LoginPage;