import { validateEmail } from "../../../utils/FieldValidation";

export const validateResetPasswordForm = (email, setError) => {
    let isValid = true;
    let newError = { email: '', password: '' };

    // Validate email
    newError.email = validateEmail(email);
    if (newError.email) {
        isValid = false;
    }

    setError(newError)
    return isValid
}