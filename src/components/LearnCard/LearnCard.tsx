import React, { useEffect, useState } from 'react';
import Button from '../atoms/Button/Button';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { useParams } from 'react-router-dom';
import { CardType } from '../../api/cards/typesCards';
import RadioInput from '../atoms/RadioInput/RadioInput';
import { upgradeCardsTC } from '../../store/card-reducer';

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
        console.log('LearnContainer useEffect');

        if (first) {
            getCard(cards);
            setFirst(false);
        }

        console.log('cards', cards);
        if (cards.length > 0) setCard(getCard(cards));

        return () => {
            console.log('LearnContainer useEffect off');
        };
    }, [dispatch, id, cards, first]);

    const onNext = () => {
        if (activeGradeItemRate > 0) {
            dispatch(upgradeCardsTC({ grade: activeGradeItemRate, card_id: card.id }));
            setIsChecked(false);
        }

        if (cards.length > 0) {
            // dispatch
            setCard(getCard(cards));
        } else {
        }
    };

    return (
        <div>
            LearnPage
            <div>{card.question}</div>
            <div>{!isChecked && <Button onClick={() => setIsChecked(true)} name={'check'} isDisabled={false} />}</div>
            {isChecked && (
                <>
                    <div>{card.answer}</div>
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
                    <div>
                        <Button onClick={onNext} name={'next'} isDisabled={false} />
                    </div>
                </>
            )}
        </div>
    );
};
export default LearnCard;
