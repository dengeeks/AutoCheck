import { validateText } from "../../../utils/FieldValidation";

export const validateTicketForm = ({ subject, setError }) => {
    let isValid = true;
    let newError = { subject: '' };

    // Validate subject
    newError.subject = validateText(subject);
    if (newError.subject) {
        isValid = false;
    }

    setError(newError);
    return isValid;
};