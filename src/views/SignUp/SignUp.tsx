import React, { FC, useEffect, useState } from 'react';
import styles from './SignUp.module.scss';
import Input from '../../components/atoms/Input/Input';
import Button from '../../components/atoms/Button/Button';
import CardBasisWrapper from '../../components/atoms/CardBasisWrapper/CardBasisWrapper';
import CommonPageWrapper from '../../components/atoms/CommonPageWrapper/CommonPageWrapper';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { registerTC, setIsRegisteredAC, SignUpParamsType } from '../../store/auth-reducer';
import PopupSuccess from '../../components/organisms/modals/PopupSuccess/PopupSuccess';
import { SubmitHandler, useForm } from 'react-hook-form';
import Portal from '../../components/atoms/Portal/Portal';

type Inputs = {
    email: string;
    password: string;
    confirmPassword: string;
};

const SignUp: FC = () => {
    const dispatch = useAppDispatch();
    const isRegistered = useAppSelector((state) => state.auth.isRegistered);
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        if (isRegistered) {
            return setShowPopup(true);
        }
    }, [isRegistered]);

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        const userData: SignUpParamsType = {
            email: data.email,
            password: data.password,
            confirmPassword: data.confirmPassword,
        };
        dispatch(registerTC(userData));
    };

    const navigate = useNavigate();
    const handleClick = () => {
        dispatch(setIsRegisteredAC({ value: false }));
        navigate('/signIn');
    };

    console.log(errors);

    return (
        <CommonPageWrapper>
            {!isRegistered && (
                <>
                    <div className={styles.wrapper}>
                        <CardBasisWrapper title={'It-incubator'}>
                            <div className={styles.spanWrapper}>
                                <span>Sign Up</span>
                            </div>
                            <div className={styles.inputWrapper}>
                                <Input
                                    label={'Email'}
                                    typeInput={'text'}
                                    withIcon={false}
                                    addProps={{
                                        ...register('email', {
                                            required: 'This field is required',
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                                message: 'Incorrect email',
                                            },
                                        }),
                                    }}
                                    error={errors.email?.message}
                                />
                                <Input
                                    label={'Password'}
                                    typeInput={'password'}
                                    withIcon={true}
                                    addProps={{
                                        ...register('password', {
                                            required: true,
                                            minLength: { value: 8, message: 'Password too short' },
                                            maxLength: { value: 14, message: 'Password too long' },
                                        }),
                                    }}
                                    error={errors.password?.message}
                                />
                                <Input
                                    label={'Confirm password'}
                                    typeInput={'password'}
                                    withIcon={true}
                                    addProps={{
                                        ...register('confirmPassword', {
                                            required: true,
                                            maxLength: 10,
                                            validate: (val: string) => {
                                                if (watch('password') !== val) {
                                                    return 'Your passwords do no match';
                                                }
                                            },
                                        }),
                                    }}
                                    error={errors.confirmPassword?.message}
                                />
                            </div>
                            <div className={styles.btns}>
                                <div className={styles.btnLeft}>
                                    <Button name={'Cancel'} isDisabled={true} />
                                </div>
                                <div className={styles.btnRight}>
                                    <Button onClick={handleSubmit(onSubmit)} name={'Register'} isDisabled={false} />
                                </div>
                            </div>
                        </CardBasisWrapper>
                    </div>
                </>
            )}
            {showPopup && (
                <Portal>
                    <PopupSuccess onClick={handleClick} />
                </Portal>
            )}
        </CommonPageWrapper>
    );
};

export default SignUp;
