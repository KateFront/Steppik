import React, {FC, useState} from 'react';
import Input from "../../../components/atoms/Input/Input";
import styles from './SignInForm.module.scss';
import Button from "../../../components/atoms/Button/Button";
import {Navigate, NavLink} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../store/store";
import {LoginParamsType, loginTC} from "../../../store/auth-reducer";
import Checkbox from "../../../components/atoms/CheckBox/Checkbox";


const SingInForm: FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useAppDispatch();
    const isLogged = useAppSelector(state => state.auth.isLoggedIn);


    const sendFormData = () => {
        const userData: LoginParamsType = {
            email,
            password,
            rememberMe: false
        }
        dispatch(loginTC(userData));
    }


    if (isLogged) {
        return <Navigate to={'/profile/'}/>
    }

    return (
        <div>
            <div className={styles.spanWrapper}>
                <span>Sign In</span>
            </div>

            <form>
                <div className={styles.inputWrapper}>
                    <div>
                        <Input label={'Email'} typeInput={"text"} withIcon={false} value={email} onChange={setEmail}/>
                    </div>
                    <div>
                        <Input label={'Password'} typeInput={'password'} withIcon={true} value={password}
                               onChange={setPassword}/>
                    </div>
                </div>
                <div><Checkbox/></div>
            </form>
            <div className={styles.linkWrapper}>
                <NavLink to='/forgot' className={styles.activeLink}>Forgot Password</NavLink>
            </div>
            <div className={styles.secondBtn}>
                <Button onClick={sendFormData} name={'Login'} isDisabled={false}/>
            </div>
            <span className={styles.labelWrapper}>Don`t have an account</span>
            <NavLink to='/signUp' className={styles.link}>Sign Up</NavLink>

        </div>
    );
};

export default SingInForm;