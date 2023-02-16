import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';
import logo from '../../../assets/Icons/logo.svg';

const Header = () => {
    return (
        <div className={styles.headerWrapper}>
            <nav className={styles.nav}>
                <div className={styles.logo}>
                    <img src={logo} alt="logo" />
                </div>
                <ul className={styles.navList}>
                    <NavLink to="/profile/" className={(navData) => (navData.isActive ? styles.active : styles.navLinkWrapper)}>
                        <li className={styles.navLinkItem}> Profile</li>
                    </NavLink>
                    <NavLink to="/signIn" className={(navData) => (navData.isActive ? styles.active : styles.navLinkWrapper)}>
                        <li className={styles.navLinkItem}>Login</li>
                    </NavLink>
                    <NavLink to="/signUp" className={(navData) => (navData.isActive ? styles.active : styles.navLinkWrapper)}>
                        <li className={styles.navLinkItem}>Register</li>
                    </NavLink>
                    <NavLink to="/forgot" className={(navData) => (navData.isActive ? styles.active : styles.navLinkWrapper)}>
                        <li className={styles.navLinkItem}>Forgot</li>
                    </NavLink>
                    <NavLink
                        to="/createPassword"
                        className={(navData) => (navData.isActive ? styles.active : styles.navLinkWrapper)}
                    >
                        <li className={styles.navLinkItem}>CreateNewPassword</li>
                    </NavLink>
                    <NavLink to="/packList" className={(navData) => (navData.isActive ? styles.active : styles.navLinkWrapper)}>
                        <li className={styles.navLinkItem}>PackList</li>
                    </NavLink>
                    <NavLink to="/learn" className={(navData) => (navData.isActive ? styles.active : styles.navLinkWrapper)}>
                        <li className={styles.navLinkItem}>Learn</li>
                    </NavLink>
                    {/* <Button onClick={() => {}} name={'Sign in'} isDisabled={false} />*/}
                </ul>
            </nav>
        </div>
    );
};

export default Header;
