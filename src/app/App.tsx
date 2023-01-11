import React from 'react';
import {Route, Routes, Navigate} from 'react-router-dom';
import './App.scss';
import LoginPage from "./views/Login/LoginPage/LoginPage";
import SignUp from "./views/SignUp/SignUp";
import ForgotPassword from "./views/ForgotPassword/ForgotPassword";
import CreateNewPassword from "./views/CreateNewPassword/CreateNewPassword";
import ProfilePage from "./views/ProfilePage/ProfilePage";
import Header from "./components/organisms/Header/Header";

function App() {
    return (
        <div className="App">
            <div>
                <div><Header/></div>
                <Routes>
                    <Route path={'/signIn'} element={<LoginPage/>}/>
                    <Route path={'/signUp'} element={<SignUp/>}/>
                    <Route path={'/forgot'} element={<ForgotPassword/>}/>
                    <Route path={'/createPassword'} element={<CreateNewPassword/>}/>
                    <Route path={'/profile'} element={<ProfilePage />}/>
                    <Route path={'/404'} element={<h1 style={{textAlign: 'center'}}>404: PAGE NOT FOUND</h1>}/>
                    <Route path="*" element={<Navigate to={'/404'}/>}/>
                </Routes>
            </div>
        </div>
    );
}


export default App;
