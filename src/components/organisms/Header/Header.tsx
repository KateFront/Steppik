import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.scss';
import Button from '../../atoms/Button/Button';
import { useAppSelector } from '../../../store/store';
import logotype from '../../../assets/Icons/logotype.svg';

const Header = () => {
    const navigate = useNavigate();
    const onClickBtn = () => {
        navigate('/signIn');
    };

    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
    const name = useAppSelector((state) => state.app.profile?.nickName);
    const avatar = useAppSelector((state) => state.app.profile?.avatar);

    const onClickHandler = () => {
        console.log('');
    };

    return (
        <div className={styles.headerWrapper}>
            <div className={styles.logoWrapper}>
                <img src={logotype} alt="logo" />
            </div>
            <nav className={styles.nav}>
                <ul className={styles.navList}>
                    {/* <NavLink to="/profile/" className={(navData) => (navData.isActive ? styles.active : styles.navLinkWrapper)}>
                        <li className={styles.navLinkItem}> Profile</li>
                    </NavLink>
                    <NavLink to="/packList" className={(navData) => (navData.isActive ? styles.active : styles.navLinkWrapper)}>
                        <li className={styles.navLinkItem}>PackList</li>
                    </NavLink>*/}
                    {/*<NavLink to="/signIn" className={(navData) => (navData.isActive ? styles.active : styles.navLinkWrapper)}>
                        <li className={styles.navLinkItem}>Login</li>
                    </NavLink>*/}
                    {/* <NavLink to="/signUp" className={(navData) => (navData.isActive ? styles.active : styles.navLinkWrapper)}>
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
                    </NavLink>*/}
                    {/* <NavLink to="/learn" className={(navData) => (navData.isActive ? styles.active : styles.navLinkWrapper)}>
                        <li className={styles.navLinkItem}>Learn</li>
                    </NavLink>*/}
                    {isLoggedIn ? (
                        <div className={styles.wrapper}>
                            <div onClick={onClickHandler}>{name}</div>
                            <div className={styles.avatar}>
                                <img src={avatar} alt="avatar" />
                            </div>
                        </div>
                    ) : (
                        <Button onClick={onClickBtn} name={'Sign in'} isDisabled={false} />
                    )}
                </ul>
            </nav>
        </div>
    );
};

export default Header;
