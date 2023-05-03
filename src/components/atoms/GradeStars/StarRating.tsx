import React, { FC } from 'react';
import { FaStar } from 'react-icons/fa';

interface StarRatingProps {
    totalStars: number;
}

const StarRating: FC<StarRatingProps> = ({ totalStars }) => {
    console.log(totalStars);
    return (
        <div>
            {[...Array(5)].map((_, index) => {
                const cond = index < totalStars;
                return cond ? <FaStar color={'gold'} key={index} /> : <FaStar color={'gray'} key={index} />;
            })}
        </div>
    );
};

export default StarRating;
