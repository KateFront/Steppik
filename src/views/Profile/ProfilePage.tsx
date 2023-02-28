import React, { useEffect, useState } from 'react';
import CommonPageWrapper from '../../components/atoms/CommonPageWrapper/CommonPageWrapper';
import Button from '../../components/atoms/Button/Button';
import { logoutTC, updatedPersonalInfoTC } from '../../store/auth-reducer';
import { useAppDispatch, useAppSelector } from '../../store/store';
import CardBasisWrapper from '../../components/atoms/CardBasisWrapper/CardBasisWrapper';
import { Navigate } from 'react-router-dom';
import logout from '../../assets/Icons/logout.svg';
import avatarProfile from '../../assets/img/Ellipse 45.svg';
import styles from './ProfilePage.module.scss';
import { InputTypeFile } from '../../components/atoms/InputTypeFile/InputTypeFile';
import { EditableSpan } from '../../components/atoms/EditableSpan/EditableSpan';

const ProfilePage = () => {
    const [avatar, setAvatar] = useState<string>(avatarProfile);
    const [name, setName] = useState<string>('');

    const dispatch = useAppDispatch();
    const isLogin = useAppSelector<boolean>((state) => state.auth.isLoggedIn);
    const nickName = useAppSelector<string>((state) => state.app.profile?.nickName ?? '');
    const email = useAppSelector<string>((state) => state.app.profile?.email ?? '');
    const profileAvtar = useAppSelector<string>((state) => state.app.profile?.avatar ?? '');

    console.log(nickName);

    useEffect(() => {
        if (profileAvtar) {
            setAvatar(profileAvtar);
        }
        if (nickName) {
            setName(nickName);
        }
    }, [profileAvtar, nickName]);

    const sendDataToServer = () => {
        dispatch(logoutTC());
    };

    const onChangeHandler = (file: File) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            console.log(reader.result);
            setAvatar(reader.result as string);
        };
    };

    if (!isLogin) {
        return <Navigate to={'/signIn'} />;
    }

    const saveInfo = () => {
        dispatch(updatedPersonalInfoTC({ name, avatar }));
    };

    const onChangeNickName = (nickName: string) => {
        if (nickName === '') {
            console.log('error');
        }
        setName(nickName);
    };
    return (
        <div>
            <CommonPageWrapper>
                <CardBasisWrapper title={'Personal Information'}>
                    <div className={styles.avatarItemWrapper}>
                        <div className={styles.photoWrapper}>
                            <img src={avatar} alt="" className={styles.avatarWrapper} />
                        </div>
                        <InputTypeFile onChange={onChangeHandler} />
                    </div>

                    <div>
                        <EditableSpan onChange={onChangeNickName} value={nickName} />
                    </div>
                    <div>{email}</div>
                    <div className={styles.btnWrapper}>
                        <div className={styles.logoutBtn}>
                            {/*<div>
                                <img src={logout} alt="" className={styles.imgWrapper} />
                            </div>*/}
                            <Button
                                onClick={sendDataToServer}
                                name={'Log Out'}
                                isDisabled={false}
                                type={'secondary'}
                                imageUrl={logout}
                            />
                        </div>
                        <div className={styles.saveBtn}>
                            <Button onClick={() => saveInfo()} name={'Save'} isDisabled={false} />
                        </div>
                    </div>
                </CardBasisWrapper>
            </CommonPageWrapper>
        </div>
    );
};

export default ProfilePage;
