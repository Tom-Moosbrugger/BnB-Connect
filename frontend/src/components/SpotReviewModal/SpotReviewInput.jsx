import { FaStar } from "react-icons/fa";
import { useState, useEffect } from 'react';

const SpotReviewInput = ({ stars, click }) => {
    const [activeStars, setActiveStars] = useState(stars);

    useEffect(() => {
        setActiveStars(stars)
    }, [stars]);

    let createInputArr = () => {
        const inputArr = []
        
        for (let i = 1; i < 6; i++) {
            inputArr.push( 
            <div 
            key={i}
            className={activeStars >= i ? 'review-filled' : 'review-empty'}
            onMouseEnter={() => setActiveStars(i)}
            onMouseLeave={() => setActiveStars(stars)}
            onClick={() => click(i)}
            >
                <FaStar />
            </div>
            )
        }
    
        return inputArr;
    }

    return (
        <div className="spot-review-rating-inputs">
            <div id="stars">
                {createInputArr()}
            </div>
            <div id="stars-text"><span>Stars</span></div>
        </div>

    )
}

export default SpotReviewInput;