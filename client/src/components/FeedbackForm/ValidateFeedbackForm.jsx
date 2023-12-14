import { validateEmail, validateNotEmpty, validateImageSize } from "../../utils/FieldValidation";


export const validateFeedbackForm = (emailFrom, subject, message, selectedFiles, setError) => {
    let isValid = true;
    let newError = { emailFrom: '', subject: '', message: '', selectedFiles: '' };

    newError.emailFrom = validateEmail(emailFrom);
    if (newError.emailFrom) {
        isValid = false;
    }

    // Validate password
    newError.subject = validateNotEmpty(subject);
    if (newError.subject) {
        isValid = false;
    }

    newError.message = validateNotEmpty(message);
    if (newError.message) {
        isValid = false;
    }

    newError.selectedFiles = validateImageSize(selectedFiles);
    if (newError.selectedFiles) {
        isValid = false;
    }

    setError(newError);
    return isValid;
};