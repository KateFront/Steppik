import React, {FC, useState} from 'react';
import Input from "../../../components/atoms/Input/Input";
import styles from './LoginForm.module.scss';
import Button from "../../../components/atoms/Button/Button";
import {NavLink} from "react-router-dom";

const LoginForm: FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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
            </form>
            <NavLink to='/forgot' className={styles.active}>Forgot Password</NavLink>

            <div className={styles.secondBtn}>
                <Button name={'Login'} isDisabled={false}/>
            </div>

            <span className={styles.labelWrapper}>Don`t have an account</span>

            <NavLink to='/signUp' className={styles.link}>Sign Up</NavLink>


        </div>
    );
};

export default LoginForm;