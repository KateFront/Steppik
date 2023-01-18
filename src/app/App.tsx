import React, {useEffect} from 'react';
import {Route, Routes, Navigate} from 'react-router-dom';
import './App.scss';
import SignUp from "../views/SignUp/SignUp";
import ForgotPassword from "../views/ForgotPassword/ForgotPassword";
import CreateNewPassword from "../views/CreateNewPassword/CreateNewPassword";
import ProfilePage from "../views/Profile/ProfilePage";
import Header from "../components/organisms/Header/Header";
import {useAppDispatch, useAppSelector} from "../store/store";
import {initializeAppTC} from "../store/app-reducer";
import Preloader from "../components/atoms/Preloader/Preloader";
import SignIn from "../views/SignIn/SignInPage/SignIn";

function App() {

    const dispatch = useAppDispatch();
    const isInitialized = useAppSelector(state => state.app.isInitialized);

    useEffect(()=>{
        dispatch(initializeAppTC())
    },[]);

    if (!isInitialized) {
        return <Preloader/>
    }

    return (
        <div className="App">
            <div>
                <div><Header/></div>
                <Routes>
                    <Route path={'/signIn'} element={<SignIn/>}/>
                    <Route path={'/signUp'} element={<SignUp/>}/>
                    <Route path={'/forgot'} element={<ForgotPassword/>}/>
                    <Route path={'/createPassword/:token'} element={<CreateNewPassword/>}/>
                    <Route path={'/profile'} element={<ProfilePage />}/>
                    <Route path={'/404'} element={<h1 style={{textAlign: 'center'}}>404: PAGE NOT FOUND</h1>}/>
                    <Route path="*" element={<Navigate to={'/404'}/>}/>
                </Routes>
            </div>
        </div>
    );
}


export default App;
