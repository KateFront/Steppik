import React, { useState } from 'react';
import Input from '../Input/Input';
import edit from '../../../assets/Icons/Edit.svg';
import styles from './EditableSpan.module.scss';

type EditableSpanPropsType = {
    value: string;
    onChange: (newValue: string) => void;
};

// eslint-disable-next-line react/display-name
export const EditableSpan = React.memo(function (props: EditableSpanPropsType) {
    console.log('EditableSpan called');
    const [editMode, setEditMode] = useState(false);
    const [title, setTitle] = useState(props.value);

    const activateEditMode = () => {
        setEditMode(true);
        setTitle(props.value);
    };
    const activateViewMode = () => {
        setEditMode(false);
        props.onChange(title);
    };
    const changeTitle = (e: string) => {
        setTitle(e);
    };

    return editMode ? (
        <div>
            <Input value={title} onChange={changeTitle} onBlur={activateViewMode} label={'Nickname'} typeInput={'text'} />
        </div>
    ) : (
        <div className={styles.editWrapper}>
            <span className={styles.nameWrapper}>{props.value}</span>
            <div onClick={activateEditMode} className={styles.imgWrapper}>
                <img src={edit} alt="" />
            </div>
        </div>
    );
});
