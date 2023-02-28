import React, { FC } from 'react';
import Input from '../../../components/atoms/Input/Input';
import styles from './SignInForm.module.scss';
import Button from '../../../components/atoms/Button/Button';
import { Navigate, NavLink } from 'react-router-dom';
import { AppRootStateType, useAppDispatch, useAppSelector } from '../../../store/store';
import { LoginParamsType, loginTC } from '../../../store/auth-reducer';
import Checkbox from '../../../components/atoms/CheckBox/Checkbox';
import { SubmitHandler, useController, useForm } from 'react-hook-form';

type SignInInputsProps = {
    email: string;
    password: string;
    rememberMe: boolean;
};

const SingInForm: FC = () => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<SignInInputsProps>();
    const dispatch = useAppDispatch();

    const isLogged = useAppSelector((state: AppRootStateType) => state.auth.isLoggedIn);
    const error = useAppSelector((state) => state.auth.error);

    const { field } = useController({
        name: 'rememberMe',
        control,
    });

    const onSubmit: SubmitHandler<SignInInputsProps> = (data) => {
        const userData: LoginParamsType = {
            email: data.email,
            password: data.password,
            rememberMe: data.rememberMe,
        };
        dispatch(loginTC(userData));
    };

    if (isLogged) {
        return <Navigate to={'/profile/'} />;
    }

    return (
        <div>
            <form>
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
                </div>
                <div className={styles.checkboxWrapper}>
                    <Checkbox addProps={{ ...register('rememberMe') }} isChecked={field.value} />
                    <label htmlFor={'rememberMe'} className={styles.checkboxLabel}>
                        Remember Me
                    </label>
                </div>
            </form>
            <div className={styles.linkWrapper}>
                <NavLink to="/forgot" className={styles.activeLink}>
                    Forgot Password
                </NavLink>
            </div>
            <div className={styles.secondBtn}>
                <Button onClick={handleSubmit(onSubmit)} name={'Login'} isDisabled={false} />
                <div className={styles.error}>{error}</div>
            </div>
            <span className={styles.labelWrapper}>Already have an account?</span>
            <NavLink to="/signUp" className={styles.link}>
                Sign Up
            </NavLink>
        </div>
    );
};

export default SingInForm;
