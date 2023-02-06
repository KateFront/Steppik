import React, { FC } from 'react';
import MultiRangeSlider, { ChangeResult } from 'multi-range-slider-react';
import styles from './RangeInput.module.scss';

type RangeSliderType = {
    min: number;
    max: number;
    step: number;
    minValue: number;
    maxValue: number;
    onInput: (result: ChangeResult) => void;
};

const RangeInput: FC<RangeSliderType> = ({ min, max, step, onInput, minValue, maxValue }) => {
    return (
        <div className={styles.rangeWrapper}>
            <MultiRangeSlider min={min} max={max} step={step} minValue={minValue} maxValue={maxValue} onInput={onInput} />
        </div>
    );
};

export default RangeInput;
