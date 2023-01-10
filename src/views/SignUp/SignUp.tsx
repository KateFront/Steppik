import React, {FC, useState} from 'react';
import styles from "./SignUp.module.scss";
import Input from "../../components/atoms/Input/Input";
import Button from "../../components/atoms/Button/Button";
import CardBasisWrapper from "../../components/atoms/CardBasisWrapper/CardBasisWrapper";
import CommonPageWrapper from "../../components/CommonPageWrapper/CommonPageWrapper";



const SignUp: FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div>
            <CommonPageWrapper>
                <div className={styles.wrapper}>
                    <CardBasisWrapper title={'It-incubator'}>
                        <div className={styles.spanWrapper}>
                            <span>Sign Up</span>
                        </div>
                        <form>
                            <div className={styles.inputWrapper}>
                                <Input label={'Email'} typeInput={"text"} withIcon={false} value={email} onChange={setEmail}/>
                                <Input label={'Password'} typeInput={'password'} withIcon={true} value={password} onChange={setPassword}/>
                                <Input label={'Confirm password'} typeInput={'password'} withIcon={true} value={password} onChange={setPassword}/>
                            </div>
                            <div className={styles.btns}>
                                <div className={styles.btn}><Button onClick={() => {}} name={'Cancel'} isDisabled={true}/></div>
                                <div className={styles.btn}><Button onClick={() => {}} name={'Register'} isDisabled={false}/></div>
                            </div>
                        </form>
                    </CardBasisWrapper>
                </div>
            </CommonPageWrapper>
        </div>
    );
};

export default SignUp;