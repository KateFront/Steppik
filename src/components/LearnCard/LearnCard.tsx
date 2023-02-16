import React, { useEffect, useState } from 'react';
import Button from '../atoms/Button/Button';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { useParams } from 'react-router-dom';
import { CardType } from '../../api/cards/typesCards';
import RadioInput from '../atoms/RadioInput/RadioInput';
import { upgradeCardsTC } from '../../store/card-reducer';

const grades = ['Did not know', 'Forgot', 'A lot of thought', 'Confused', 'Knew the answer'];

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
    const [activeGradeItem, setActiveGradeItem] = useState<string>('');
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
        dispatch(upgradeCardsTC({ grade: 1, card_id: card.id }));
        setIsChecked(false);

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
                            label={gradeItem}
                            checked={activeGradeItem === gradeItem}
                            onChange={() => {
                                setActiveGradeItem(gradeItem);
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
