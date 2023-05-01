import React, { useEffect, useState } from 'react';
import Button from '../atoms/Button/Button';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { useParams } from 'react-router-dom';
import { CardType } from '../../api/cards/typesCards';
import RadioInput from '../atoms/RadioInput/RadioInput';
import { upgradeCardGradeTC } from '../../store/card-reducer';
import CardBasisWrapper from '../atoms/CardBasisWrapper/CardBasisWrapper';

import styles from './LearnCard.module.scss';

type GradeItemType = {
    name: string;
    rate: number;
};

const grades: GradeItemType[] = [
    { name: 'Did not know', rate: 1 },
    { name: 'Forgot', rate: 2 },
    { name: 'A lot of thought', rate: 3 },
    { name: 'Confused', rate: 4 },
    { name: 'Knew the answer', rate: 5 },
];

const getCard = (cards: CardType[]): CardType => {
    const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
    const rand = Math.random() * sum;
    const res = cards.reduce(
        (acc: { sum: number; id: number }, card, i) => {
            const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
            return { sum: newSum, id: newSum < rand ? i : acc.id };
        },
        { sum: 0, id: -1 }
    );
    return cards[res.id + 1];
};

const LearnCard = () => {
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [first, setFirst] = useState<boolean>(true);
    const [activeGradeItemRate, setActiveGradeItemRate] = useState<number>(0);
    const cards = useAppSelector<CardType[]>((state) => state.card.cards);

    const { id } = useParams();

    const [card, setCard] = useState<CardType>({
        id: 'fake',
        cardsPackId: '',
        answer: 'answer fake',
        question: 'question fake',
        grade: 0,
        shots: 0,
        created: '',
        updated: '',
        userId: '',
    });

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (first) {
            getCard(cards);
            setFirst(false);
        }
        if (cards.length > 0) setCard(getCard(cards));
    }, [dispatch, id, cards, first]);

    const onNext = () => {
        if (activeGradeItemRate > 0) {
            dispatch(upgradeCardGradeTC({ grade: activeGradeItemRate, card_id: card.id }));
            setIsChecked(false);
        }

        if (cards.length > 0) {
            setCard(getCard(cards));
        } else {
        }
    };

    return (
        <CardBasisWrapper>
            <div className={styles.questionItem}>
                <div className={styles.textWrapper}>Question: </div>
                <div>
                    {card.questionImg ? (
                        <div className={styles.imgWrapper}>
                            <img src={card.questionImg} alt="img" />
                        </div>
                    ) : (
                        card.question
                    )}
                </div>

                <div className={styles.secondText}>Количество попыток ответов на вопрос: 10</div>
            </div>
            <div>{!isChecked && <Button onClick={() => setIsChecked(true)} name={'Show answer'} isDisabled={false} />}</div>
            {isChecked && (
                <>
                    <div className={styles.answerItem}>
                        <div className={styles.textWrapper}>Answer: </div>
                        {card.answerImg ? (
                            <div className={styles.imgWrapper}>
                                <img src={card.answerImg} alt="img" />
                            </div>
                        ) : (
                            card.answer
                        )}
                    </div>
                    <div className={styles.textWrapper}>Rate yourself:</div>
                    <div className={styles.inputWrapper}>
                        {grades.map((gradeItem, index) => (
                            <RadioInput
                                key={'grade-' + index}
                                label={gradeItem.name}
                                checked={activeGradeItemRate === gradeItem.rate}
                                onChange={() => {
                                    setActiveGradeItemRate(gradeItem.rate);
                                }}
                            />
                        ))}
                    </div>
                    <div className={styles.btn}>
                        <Button onClick={onNext} name={'Next'} isDisabled={false} />
                    </div>
                </>
            )}
        </CardBasisWrapper>
    );
};
export default LearnCard;
