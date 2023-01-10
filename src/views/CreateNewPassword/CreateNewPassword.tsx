import React, {useState} from 'react';
import styles from "../SignUp/SignUp.module.scss";
import CardBasisWrapper from "../../components/atoms/CardBasisWrapper/CardBasisWrapper";
import Input from "../../components/atoms/Input/Input";
import Button from "../../components/atoms/Button/Button";
import CommonPageWrapper from "../../components/CommonPageWrapper/CommonPageWrapper";

const CreateNewPassword = () => {
    const [password, setPassword] = useState('');
    return (
        <div>
            <CommonPageWrapper>
                <div className={styles.wrapper}>
                    <CardBasisWrapper title={'It-incubator'}>
                        <div className={styles.spanWrapper}>
                            <span>Create new password</span>
                        </div>
                        <form>
                            <div className={styles.inputWrapper}>
                                <Input label={'Password'} typeInput={"password"} withIcon={true} value={password}
                                       onChange={setPassword}/>
                            </div>
                            <div>
                                <span>Create new password and we will send you further instructions to email</span>
                            </div>
                            <div className={styles.btns}>
                                <Button onClick={() => {
                                }} name={'Create new password'} isDisabled={false}/>
                            </div>
                        </form>
                    </CardBasisWrapper>
                </div>
            </CommonPageWrapper>
        </div>
    );
};

export default CreateNewPassword;