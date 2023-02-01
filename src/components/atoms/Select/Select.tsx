import React from 'react';
import {useAppDispatch, useAppSelector} from "../../../store/store";
import {SubmitHandler, useForm} from "react-hook-form";
import {setPageSizeAC} from "../../../store/pack-reducer";
import styles from './Select.module.scss'

type SelectPropsType = {
    pageSize: number
}
export const Select = (props: SelectPropsType) => {
    const dispatch = useAppDispatch();
    const pageSize = useAppSelector(state => state.pack.pageSize);

    const {handleSubmit} = useForm<SelectPropsType>();


    const onSubmit: SubmitHandler<SelectPropsType> = () => {
        dispatch(setPageSizeAC({pageSize}));
    }

    return (
        <div onSubmit={handleSubmit(onSubmit)} className={styles.filters}>
            <span>Show</span>
            <select
                name="choosePageSize"
                value={props.pageSize}
                style={{display: 'block'}}
            >
                <option value={"10"} label="10"/>
                <option value={"20"} label="20"/>
                <option value={"30"} label="30"/>
            </select>
            <span>Cards per Page</span>
        </div>
    );
}
export default Select;