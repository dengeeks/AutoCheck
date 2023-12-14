import React, { useState } from 'react';
import { Rating } from '@mui/material';

const StarRating = ({ readOnly = true, onChange, defaultValue }) => {
  const [rating, setRating] = useState(defaultValue || 0);

  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <Rating
      name="star-rating"
      value={rating}
      precision={1}
      max={5}
      readOnly={readOnly}
      onChange={handleRatingChange}
    />
  );
};

export default StarRating;