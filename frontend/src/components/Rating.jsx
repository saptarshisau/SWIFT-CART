import { useState } from 'react';

function Rating({ value, onRatingChange, disabled }) {
    const [hoveredRating, setHoveredRating] = useState(0);
    const [selectedRating, setSelectedRating] = useState(value || 0);

    // Handle star hover
    const handleMouseEnter = (rating) => {
        if (!disabled) {
            setHoveredRating(rating);
        }
    };

    // Mouse Leave
    const handleMouseLeave = () => {
        if (!disabled) {
            setHoveredRating(0);
        }
    };

    // Handle click
    const handleClick = (rating) => {
        if (!disabled) {
            setSelectedRating(rating);

            if (onRatingChange) {
                onRatingChange(rating);
            }
        }
    };

    // Function to generate stars based on the selected rating
    const generateStars = () => {
        const stars = [];

        for (let i = 1; i <= 5; i++) {
            const isFilled = i <= (hoveredRating || selectedRating);

            stars.push(
                <span
                    key={i}
                    onMouseEnter={() => handleMouseEnter(i)}
                    /* by passing i as the parameter to the handleMouseEnter function
                     it stores the value of the star that is being hovered
                     This allows us to highlight stars from 1 to the hovered rating
                     when the user hovers over the 3rd star, i will be 3, so handleMouseEnter(3) is called
                     which sets hoveredRating to 3*/

                    onMouseLeave={handleMouseLeave}
                    onClick={() => handleClick(i)}
                    style={{
                        pointerEvents: disabled ? 'none' : 'auto'
                    }}
                    className={`
                        cursor-pointer
                        select-none
                        text-2xl
                        transition-all
                        duration-300
                        ${isFilled ? 'text-indigo-600' : 'text-slate-400'}
                        ${!disabled ? 'hover:scale-125 hover:text-indigo-600' : ''}
                    `}
                >
                    ★
                </span>
            );
        }

        return stars;
    };

    return (
        <div>
            <div className="flex items-center">
                {generateStars()}
            </div>
        </div>
    );
}

export default Rating;