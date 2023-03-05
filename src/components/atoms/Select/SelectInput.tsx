import React, { useState, KeyboardEvent, useEffect } from 'react';
import styles from './SelectInput.module.scss';
import classnames from 'classnames';

export type ItemType = {
    title: string;
    value: string;
};

type SelectPropsType = {
    value?: string;
    onChange: (value: string) => void;
    items: ItemType[];
};

export function SelectInput(props: SelectPropsType) {
    const [active, setActive] = useState(false);
    const [hoveredElementValue, setHoveredElementValue] = useState(props.value);

    const selectedItem = props.items.find((i) => i.value === props.value);
    const hoveredItem = props.items.find((i) => i.value === hoveredElementValue);

    useEffect(() => {
        setHoveredElementValue(props.value);
    }, [props.value]);

    const toggleItem = () => setActive(!active);
    const onItemClick = (value: string) => {
        props.onChange(value);
        toggleItem();
    };

    const onKeyUp = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            for (let i = 0; i < props.items.length; i++) {
                if (props.items[i].value === hoveredElementValue) {
                    const pretendentElement = e.key === 'ArrowDown' ? props.items[i + 1] : props.items[i - 1];
                    if (pretendentElement) {
                        props.onChange(pretendentElement.value);
                        return;
                    }
                }
            }
            if (!selectedItem) {
                props.onChange(props.items[0].value);
            }
        }
        if (e.key === 'Enter' || e.key === 'Escape') {
            setActive(false);
        }
    };

    return (
        <>
            <div className={styles.select} onKeyUp={onKeyUp} tabIndex={0} onClick={toggleItem}>
                <span className={styles.main}>{selectedItem && selectedItem.title}</span>
                {active && (
                    <div className={styles.items}>
                        {props.items.map((i) => (
                            <div
                                onMouseEnter={() => {
                                    setHoveredElementValue(i.value);
                                }}
                                className={classnames(styles.item, {
                                    [styles.selected]: hoveredItem === i,
                                })}
                                key={i.value}
                                onClick={() => {
                                    onItemClick(i.value);
                                }}
                            >
                                {i.title}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
