import React, { useEffect, useState } from 'react';
import styles from '../SignUp/SignUp.module.scss';
import CardBasisWrapper from '../../components/atoms/CardBasisWrapper/CardBasisWrapper';
import Input from '../../components/atoms/Input/Input';
import Button from '../../components/atoms/Button/Button';
import CommonPageWrapper from '../../components/atoms/CommonPageWrapper/CommonPageWrapper';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { newPasswordTC, setIsNewPassword } from '../../store/auth-reducer';
import PopupNewPassword from '../../components/organisms/modals/PopupNewPassword/PopupNewPassword';
import Portal from '../../components/atoms/Portal/Portal';

const CreateNewPassword = () => {
    const [password, setPassword] = useState('');
    const dispatch = useAppDispatch();
    const isNewPassword = useAppSelector((state) => state.auth.isNewPassword);
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        if (isNewPassword) {
            return setShowPopup(true);
        }
    }, [isNewPassword]);

    const { token } = useParams();

    const navigate = useNavigate();
    const handleClick = () => {
        dispatch(setIsNewPassword({ value: true }));
        navigate('/signIn');
    };

    const createNewPassword = () => {
        if (token) {
            const newPassword = {
                password,
                resetPasswordToken: token,
            };
            dispatch(newPasswordTC(newPassword));
        }
    };

    return (
        <div>
            <CommonPageWrapper>
                {!isNewPassword && (
                    <>
                        <div className={styles.wrapper}>
                            <CardBasisWrapper title={'It-incubator'}>
                                <div className={styles.spanWrapper}>
                                    <span>Create new password</span>
                                </div>
                                <form>
                                    <div className={styles.inputWrapper}>
                                        <Input
                                            label={'Password'}
                                            typeInput={'password'}
                                            withIcon={true}
                                            value={password}
                                            onChange={setPassword}
                                        />
                                    </div>
                                    <div>
                                        <span>Create new password and we will send you further instructions to email</span>
                                    </div>
                                    <div className={styles.btns}>
                                        <Button onClick={createNewPassword} name={'Create new password'} isDisabled={false} />
                                    </div>
                                </form>
                            </CardBasisWrapper>
                        </div>
                    </>
                )}
                {showPopup && (
                    <Portal>
                        <PopupNewPassword onClick={handleClick} />
                    </Portal>
                )}
            </CommonPageWrapper>
        </div>
    );
};

export default CreateNewPassword;
