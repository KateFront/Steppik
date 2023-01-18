import React, {useEffect, useState} from 'react';
import styles from "../ForgotPassword/ForgotPassword.module.scss";
import CardBasisWrapper from "../../components/atoms/CardBasisWrapper/CardBasisWrapper";
import Input from "../../components/atoms/Input/Input";
import Button from "../../components/atoms/Button/Button";
import CommonPageWrapper from "../../components/CommonPageWrapper/CommonPageWrapper";
import { NavLink, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../store/store";
import {forgotPasswordTC, setIsForgotAC} from "../../store/auth-reducer";
import PopupCheckEmail from "../../components/atoms/Popup/PopupCheckEmail/PopupCheckEmail";

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const dispatch = useAppDispatch();
    const isForgotPassword = useAppSelector(state => state.auth.isForgot);
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        if (isForgotPassword) {
            return setShowPopup(true)
        }
    }, [isForgotPassword]);

    const sendInstructions = () => {
        return dispatch(forgotPasswordTC({
            email
        }))
    }

    const navigate = useNavigate();
    const handleClick = () => {
        dispatch(setIsForgotAC({value: false}));
        navigate('/signIn');
    }
    return (
        <div>
            <CommonPageWrapper>
                {!isForgotPassword &&
                    <>
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
                                </form>
                                <div className={styles.span}>
                                    <span>Enter your email address and we will send you further instructions</span>
                                </div>
                                <div className={styles.btn}>
                                    <Button onClick={sendInstructions} name={'Send Instructions'} isDisabled={false}/>
                                </div>
                                <div className={styles.labelWrapper}>
                                    <span>Did you remember your password?</span>
                                </div>
                                <NavLink to='/signIn' className={styles.link}>Try logging in</NavLink>
                            </CardBasisWrapper>
                        </div>
                    </>
                }
                {
                    showPopup && <PopupCheckEmail onClick={handleClick}/>
                }
            </CommonPageWrapper>
        </div>
    );
};

export default ForgotPassword;