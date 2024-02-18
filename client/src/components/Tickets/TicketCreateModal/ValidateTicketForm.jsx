import { validateText, validateMessage } from "../../../utils/FieldValidation";

export const validateTicketForm = ({ subject, message, setError }) => {
    let isValid = true;
    let newError = { subject: '', message: '' };

    // Validate subject
    newError.subject = validateMessage(subject);
    if (newError.subject) {
        isValid = false;
    }
    newError.message = validateText(message);
    if (newError.message) {
        isValid = false;
    }

    setError(newError);
    return isValid;
};