import React, { FC } from 'react';
import styles from './TextInputs.module.scss';
import Input from '../../../../../../atoms/Input/Input';

import { UseFormRegister } from 'react-hook-form/dist/types/form';
import { PopupFieldsType } from '../../PopupNewCard';

interface TextInputsProps {
    register: UseFormRegister<PopupFieldsType>;
    errors: any;
}

const TextInputs: FC<TextInputsProps> = ({ register, errors }) => {
    return (
        <div className={styles.inputWrapper}>
            <Input
                label={'Question'}
                typeInput={'text'}
                addProps={{
                    ...register('question', {
                        required: true,
                        minLength: { value: 8, message: 'Name too short' },
                        maxLength: { value: 14, message: 'Name too long' },
                    }),
                }}
                error={errors.question?.message}
            />

            <Input
                label={'Answers'}
                typeInput={'text'}
                addProps={{
                    ...register('answer', {
                        required: true,
                        minLength: { value: 8, message: 'Name too short' },
                        maxLength: { value: 14, message: 'Name too long' },
                    }),
                }}
                error={errors.answer?.message}
            />
        </div>
    );
};

export default TextInputs;
