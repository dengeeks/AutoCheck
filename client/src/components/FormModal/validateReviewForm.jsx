import { validateText } from '../../utils/FieldValidation'


export const validateReviewForm = ({ text, setError }) => {
    let isValid = true;
    let newError = { text: '' };
  
    // Validate text, not email
    newError.text = validateText(text);
  
    if (newError.text) {
      isValid = false;
    }
  
    setError(newError);
    return isValid;
};