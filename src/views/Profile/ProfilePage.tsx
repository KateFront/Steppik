import React from 'react';
import CommonPageWrapper from "../../components/CommonPageWrapper/CommonPageWrapper";
import Button from "../../components/atoms/Button/Button";
import {logoutTC} from "../../store/auth-reducer";
import {useAppDispatch, useAppSelector} from "../../store/store";
import CardBasisWrapper from "../../components/atoms/CardBasisWrapper/CardBasisWrapper";
import {Navigate} from "react-router-dom";

const ProfilePage = () => {

    const dispatch = useAppDispatch();
    const isLogin = useAppSelector<boolean>(state => state.auth.isLoggedIn);

    const sendDataToServer = () => {
        dispatch(logoutTC());
    }

    if (!isLogin) {
        return <Navigate to={'/signIn'}/>
    }


    return (
        <div>
            <CommonPageWrapper>
                <CardBasisWrapper title={'Profile'}>
                    <div>
                        <Button onClick={sendDataToServer} name={'Log Out'} isDisabled={false}/>
                    </div>
                </CardBasisWrapper>
            </CommonPageWrapper>
        </div>
    );
};

export default ProfilePage;