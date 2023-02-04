import React from 'react';
import CommonPageWrapper from '../../../components/atoms/CommonPageWrapper/CommonPageWrapper';
import CardBasisWrapper from '../../../components/atoms/CardBasisWrapper/CardBasisWrapper';
import styles from './SignIn.module.scss';
import SingInForm from '../SignInForm/SingInForm';

const SignIn = () => {
    return (
        <CommonPageWrapper>
            <div className={styles.wrapper}>
                <CardBasisWrapper title={'It-incubator'}>
                    <SingInForm />
                </CardBasisWrapper>
            </div>
        </CommonPageWrapper>
    );
};

export default SignIn;
