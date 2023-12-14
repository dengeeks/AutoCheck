import { validatePassword, validateEmail } from "../../../utils/FieldValidation";

export const validateLoginForm = (email, password, setError) => {
    let isValid = true;
    let newError = { email: '', password: '' };

    // Validate email
    newError.email = validateEmail(email);
    if (newError.email) {
        isValid = false;
    }

    // Validate password
    newError.password = validatePassword(password);
    if (newError.password) {
        isValid = false;
    }

    setError(newError);
    return isValid;
};