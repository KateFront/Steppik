import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';
import logo from '../../../assets/Icons/logo.svg'

const Header = () => {
    return (
        <div>
            <nav className={styles.nav}>
                <div className={styles.logo}><img src={logo} alt="logo"/></div>
                <div className={styles.item}>
                    <NavLink to='/profile/' className = { navData => navData.isActive ? styles.active : styles.item}>Profile</NavLink>
                </div>
                <div className={styles.item}>
                    <NavLink to='/signIn' className ={ navData => navData.isActive ? styles.active : styles.item}>Login</NavLink>
                </div>
                <div className={styles.item}>
                    <NavLink to='/signUp' className ={ navData => navData.isActive ? styles.active : styles.item}>Register</NavLink>
                </div>
                <div className={styles.item}>
                    <NavLink to='/forgot' className ={ navData => navData.isActive ? styles.active : styles.item}>Forgot</NavLink>
                </div>
                <div className={styles.item}>
                    <NavLink to='/createPassword' className ={ navData => navData.isActive ? styles.active : styles.item}>CreateNewPassword</NavLink>
                </div>
            </nav>
        </div>
    );
};

export default Header;