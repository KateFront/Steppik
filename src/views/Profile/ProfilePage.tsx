import React, { useEffect, useState } from 'react';
import CommonPageWrapper from '../../components/atoms/CommonPageWrapper/CommonPageWrapper';
import Button from '../../components/atoms/Button/Button';
import { logoutTC, updatedPersonalInfoTC } from '../../store/auth-reducer';
import { useAppDispatch, useAppSelector } from '../../store/store';
import CardBasisWrapper from '../../components/atoms/CardBasisWrapper/CardBasisWrapper';
import { Navigate, useNavigate } from 'react-router-dom';
import avatarProfile from '../../assets/img/avatar.webp';
import styles from './ProfilePage.module.scss';
import { InputTypeFile } from '../../components/atoms/InputTypeFile/InputTypeFile';
import { EditableSpan } from '../../components/atoms/EditableSpan/EditableSpan';
import Arrow from '../../assets/Icons/Arrow.svg';
import Container from '../../components/atoms/Container/Container';

const ProfilePage = () => {
    const navigate = useNavigate();
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
            dispatch(updatedPersonalInfoTC({ name, avatar }));
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
    const onClickToBack = () => {
        navigate('/packList');
    };
    return (
        <CommonPageWrapper customStyles={styles.commonWrapper}>
            <Container>
                <div className={styles.mainWrapper}>
                    <div className={styles.backPackList} onClick={onClickToBack}>
                        <img src={Arrow} alt="" className={styles.imgWrapper} />
                        Back to Packs List
                    </div>
                    <CardBasisWrapper title={'Personal Information'}>
                        <div className={styles.avatarItemWrapper}>
                            <div className={styles.photoWrapper}>
                                <img src={avatar} alt="avatar" className={styles.avatarWrapper} />
                            </div>
                            <InputTypeFile onChange={onChangeHandler} />
                        </div>
                        <div className={styles.nickNameItemWrapper}>
                            <EditableSpan onChange={onChangeNickName} value={nickName} />
                        </div>
                        <div className={styles.emailWrapper}>{email}</div>
                        <div className={styles.btnWrapper}>
                            <div className={styles.logoutBtn}>
                                <Button
                                    onClick={sendDataToServer}
                                    name={'Log Out'}
                                    iconType={'LogOut'}
                                    isDisabled={false}
                                    type={'secondary'}
                                />
                            </div>
                            <div className={styles.saveBtn}>
                                <Button onClick={() => saveInfo()} name={'Save'} isDisabled={false} className={styles.square} />
                            </div>
                        </div>
                    </CardBasisWrapper>
                </div>
            </Container>
        </CommonPageWrapper>
    );
};

export default ProfilePage;
