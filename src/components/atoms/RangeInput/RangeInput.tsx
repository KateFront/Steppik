import React, {FC} from 'react';
import styles from "./RangeInput.module.scss";

type RangeSliderType = {
    min: number;
    max: number;
    step: number;
    value: number[];
    onChange: (value: number[]) => void;
}

const RangeInput: FC<RangeSliderType> = ({min, max, step, value, onChange}) => {
    return (
        <div>
            <div className={styles.titleWrapper}>
                <span>Number of cards</span>
            </div>
            <div>
                {/*<RangeSlider  min={min}
                              max={max}
                              step={step}
                              value={value}
                              onChange={(value: any) => onChange(value)}
                />*/}
            </div>
        </div>
    );
};

export default RangeInput;