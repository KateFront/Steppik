import React, { useState } from 'react';
import styles from './CardActions.module.scss';
import Edit from '../../../../assets/Icons/Edit.svg';
import Delete from '../../../../assets/Icons/Delete.svg';
import Teacher from '../../../../assets/Icons/teacher.svg';
import Dots from '../../../../assets/Icons/dots.svg';

const CardActions = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={styles.actionsWrapper}>
            <div className={styles.btnWrapper}>
                <button onClick={() => setIsOpen((s) => !s)} className={styles.btnCircle}>
                    <img src={Dots} alt="" className={styles.btnImgWrapper} />
                </button>
            </div>
            {isOpen && (
                <div className={styles.actionItemWrapper}>
                    <div className={styles.btnItemWrapper}>
                        <img src={Edit} alt="" className={styles.imgWrapper} />
                        Edit
                    </div>
                    <div className={styles.btnItemWrapper}>
                        <img src={Delete} alt="" className={styles.imgWrapper} />
                        Delete
                    </div>
                    <div className={styles.btnItemWrapper}>
                        <img src={Teacher} alt="" className={styles.imgWrapper} />
                        Learn
                    </div>
                </div>
            )}
        </div>
    );
};

export default CardActions;
