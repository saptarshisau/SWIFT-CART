import { useState } from 'react';
import '../componentStyles/Rating.css';

function Rating({ value, onRatingChange, disabled }) {
    const [hoveredRating, setHoveredRating] = useState(0);
    const [selectedRating, setSelectedRating] = useState(value || 0)

    // Handle star hover
    const handleMouseEnter = (rating) => {
        if (!disabled) {
            setHoveredRating(rating)
        }
    }

    // Mouse Leave
    const handleMouseLeave = () => {
        if (!disabled) {
            setHoveredRating(0)
        }
    }

    // Handle click
    const handleClick = (rating) => {
        if (!disabled) {
            setSelectedRating(rating)
            if (onRatingChange) {
                onRatingChange(rating)
            }
        }

    }

    // Function to generate stars based on the selected rating
    const generateStars = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            const isFilled = i <= (hoveredRating || selectedRating);
            stars.push(
                <span
                    key={i}
                    className={`star ${isFilled ? 'filled' : 'empty'}`}
                    onMouseEnter={() => handleMouseEnter(i)}
                    /* by passing i as the parameter to the handleMouseEnter function
                     it stores the value of the star that is being hovered
                     This allows us to highlight stars from 1 to the hovered rating
                     when the user hovers over the 3rd star, i will be 3, so handleMouseEnter(3) is called
                     which sets hoveredRating to 3*/

                    onMouseLeave={handleMouseLeave}
                    onClick={() => handleClick(i)}
                    style={{ pointerEvents: disabled ? 'none' : 'auto' }}
                >★</span>
            )
        }
        return stars;

    }
    return (
        <div>
            <div className="rating"> {generateStars()}</div>
        </div>
    )
}

export default Rating
