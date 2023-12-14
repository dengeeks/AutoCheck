import { validatePassword, validateEmail, validateName } from "../../../utils/FieldValidation"

export const validateRegistrationForm = (firstName, lastName, email, password, setError) => {
    let isValid = true;
    let newError = { firstName: '', lastName: '', email: '', password: '' };
    
    // Validate email
    newError.firstName = validateName(firstName);
    if (newError.firstName) {
        isValid = false;
    }
    newError.lastName = validateName(lastName);
    if (newError.lastName) {
        isValid = false;
    }
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
