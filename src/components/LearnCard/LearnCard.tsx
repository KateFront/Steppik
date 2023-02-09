import React, { useState } from 'react';
import styles from './LearnCard.module.scss';
import Button from '../atoms/Button/Button';
import RadioInput from '../atoms/RadioInput/RadioInput';

const LearnCard = () => {
    const [radioValue, setRadioValue] = useState('option5');

    return (
        <div className={styles.wrapper}>
            <div>
                <div className={styles.questionItem}>
                    <div className={styles.topTextWrapper}>
                        <span className={styles.boldText}>Question:</span>
                        <span> How This works in JavaScript?</span>
                    </div>
                    <div>
                        <span className={styles.secondText}>Количество попыток ответов на вопрос: 10</span>
                    </div>
                </div>
                <div className={styles.answerItem}>
                    <span className={styles.boldText}>Answer:</span>
                    <span> This is how This works in JavaScript</span>
                </div>
                <div className={styles.radioInputWrapper}>
                    <span className={styles.textWrapper}>Rate yourself:</span>
                    <RadioInput
                        options={[
                            { value: 'option1', label: 'Did not know' },
                            { value: 'option2', label: 'Forgot' },
                            { value: 'option3', label: 'A lot of thought' },
                            { value: 'option4', label: 'Сonfused' },
                            { value: 'option5', label: 'Knew the answer' },
                        ]}
                        value={radioValue}
                        onChange={(value) => setRadioValue(value)}
                    />
                </div>
                <div>
                    <Button onClick={() => console.log('Hi')} name={'Show answer'} isDisabled={false} />
                </div>
            </div>
        </div>
    );
};

export default LearnCard;
