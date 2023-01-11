import React, {FC, useState} from 'react';
import styles from "./SignUp.module.scss";
import Input from "../../components/atoms/Input/Input";
import Button from "../../components/atoms/Button/Button";
import CardBasisWrapper from "../../components/atoms/CardBasisWrapper/CardBasisWrapper";
import CommonPageWrapper from "../../components/CommonPageWrapper/CommonPageWrapper";
import { Navigate } from 'react-router-dom';
import {useAppDispatch, useAppSelector} from "../../store/store";


const SignUp: FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useAppDispatch();
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);

    /*const sendDataToServer = () => {
        authAPI.register({email, password}).then((res)=>{
            setIsLoggedIn(true);
        })
    }*/


    if(isLoggedIn){
        return <Navigate to={'/profile/'}/>
    }

    return (
        <div>
            <CommonPageWrapper>
                <div className={styles.wrapper}>
                    <CardBasisWrapper title={'It-incubator'}>
                        <div className={styles.spanWrapper}>
                            <span>Sign Up</span>
                        </div>
                            <div className={styles.inputWrapper}>
                                <Input label={'Email'} typeInput={"text"} withIcon={false} value={email}
                                       onChange={setEmail}/>
                                <Input label={'Password'} typeInput={'password'} withIcon={true} value={password}
                                       onChange={setPassword}/>
                                <Input label={'Confirm password'} typeInput={'password'} withIcon={true}
                                       value={password} onChange={setPassword}/>
                            </div>
                            <div className={styles.btns}>
                                <div className={styles.btn}><Button onClick={() => {
                                }} name={'Cancel'} isDisabled={true}/></div>
                                <div className={styles.btn}>
                                    <Button onClick={()=> isLoggedIn} name={'Register'} isDisabled={false}/>
                                </div>
                            </div>
                    </CardBasisWrapper>
                </div>
            </CommonPageWrapper>
        </div>
    );
};

export default SignUp;