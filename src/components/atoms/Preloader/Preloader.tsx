import React from 'react';
import s from "./Preloader.module.scss"
import preloader from '../../../assets/img/preloader.gif'

const Preloader = () => {
    return (
        <div>
            <div className={s.overlay}>
                <div className={s.wrapper}>
                    <img src={preloader} alt="loading..."/>
                </div>
            </div>
        </div>
    );
};

export default Preloader;