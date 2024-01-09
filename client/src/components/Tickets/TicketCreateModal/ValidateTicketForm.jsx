import { validateText } from "../../../utils/FieldValidation";

export const validateTicketForm = ({ subject, text, setError }) => {
    let isValid = true;
    let newError = { subject: '', text: '' };

    // Validate subject
    newError.subject = validateText(subject);
    if (newError.subject) {
        isValid = false;
    }

    // Validate text
    newError.text = validateText(text);
    if (newError.text) {
        isValid = false;
    }

    setError(newError);
    return isValid;
};