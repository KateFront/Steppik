import React, {useState} from 'react';
import styles from "../SignUp/SignUp.module.scss";
import CardBasisWrapper from "../../components/atoms/CardBasisWrapper/CardBasisWrapper";
import Input from "../../components/atoms/Input/Input";
import Button from "../../components/atoms/Button/Button";
import CommonPageWrapper from "../../components/CommonPageWrapper/CommonPageWrapper";
import {NavLink} from "react-router-dom";

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    return (
        <div>
            <CommonPageWrapper>
                <div className={styles.wrapper}>
                    <CardBasisWrapper title={'It-incubator'}>
                        <div className={styles.spanWrapper}>
                            <span>Forgot your password?</span>
                        </div>
                        <form>
                            <div className={styles.inputWrapper}>
                                <Input label={'Email'} typeInput={"text"} withIcon={false} value={email}
                                       onChange={setEmail}/>
                            </div>
                            <div className={styles.span}>
                                <span>Enter your email address and we will send you further instructions </span>
                            </div>
                            <div className={styles.btn}>
                                <Button onClick={() => {
                                }} name={'Send Instructions'} isDisabled={false}/>
                            </div>
                            <div className={styles.labelWrapper}>
                                <span>Did you remember your password?</span>
                            </div>
                            <NavLink to='/signIn' className={styles.link}>Try logging in</NavLink>
                        </form>
                    </CardBasisWrapper>
                </div>
            </CommonPageWrapper>
        </div>
    );
};

export default ForgotPassword;