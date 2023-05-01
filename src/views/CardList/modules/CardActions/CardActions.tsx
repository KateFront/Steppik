import React, { useState } from 'react';
import styles from './CardActions.module.scss';
import Edit from '../../../../assets/Icons/Edit.svg';
import Delete from '../../../../assets/Icons/Delete.svg';
import Teacher from '../../../../assets/Icons/teacher.svg';
import Dots from '../../../../assets/Icons/dots.svg';
import { useNavigate } from 'react-router-dom';
import PopupEditCard from '../../../../components/organisms/modals/PopupCards/PopupEditCard/PopupEditCard';
import PopupDeleteCard from '../../../../components/organisms/modals/PopupCards/PopupDeleteCards/PopupDeleteCards';

const CardActions = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showEditPopup, setShowEditPopup] = useState(false);
    const [showDeletePopup, setShowDeletePopup] = useState(false);

    const navigate = useNavigate();
    const onClickLearn = () => {
        navigate('/learn');
    };
    const onClickEdit = () => {
        setShowEditPopup(true);
    };
    const onClickDelete = () => {
        setShowDeletePopup(true);
    };

    return (
        <div className={styles.actionsWrapper}>
            <div className={styles.btnWrapper}>
                <button onClick={() => setIsOpen((s) => !s)} className={styles.btnCircle}>
                    <img src={Dots} alt="dots" className={styles.btnImgWrapper} />
                </button>
            </div>
            {isOpen && (
                <div className={styles.actionItemWrapper}>
                    <div className={styles.btnItemWrapper} onClick={onClickEdit}>
                        <img src={Edit} alt="" className={styles.imgWrapper} />
                        <span>Edit</span>
                    </div>
                    <div className={styles.btnItemWrapper} onClick={onClickDelete}>
                        <img src={Delete} alt="" className={styles.imgWrapper} />
                        <span>Delete</span>
                    </div>
                    <div className={styles.btnItemWrapper} onClick={onClickLearn}>
                        <img src={Teacher} alt="" className={styles.imgWrapper} />
                        <span>Learn</span>
                    </div>
                </div>
            )}
            {showEditPopup && (
                <PopupEditCard active={showEditPopup} setActive={setShowEditPopup} onClose={() => setShowEditPopup(true)} />
            )}
            {showDeletePopup && (
                <PopupDeleteCard
                    active={showDeletePopup}
                    setActive={setShowDeletePopup}
                    onClose={() => setShowDeletePopup(true)}
                />
            )}
        </div>
    );
};

export default CardActions;
