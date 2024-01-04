import { validatePassword, validateEmail, validateName } from "../../../utils/FieldValidation"

export const validateAccountSettings = ({ first_name, last_name, email, password, setError }) => {
    let isValid = true;
    let newError = { first_name: '', last_name: '', email: '', password: '' };
    
    // Validate email
    newError.first_name = validateName(first_name);
    if (newError.first_name) {
        isValid = false;
    }
    newError.last_name = validateName(last_name);
    if (newError.last_name) {
        isValid = false;
    } 
    newError.email = validateEmail(email);
    if (newError.email) {
        isValid = false;
    }   
    // Validate password
    if (password) {
        newError.password = validatePassword(password);
        if (newError.password) {
            isValid = false;
        }
    }
    
    setError(newError);
    return isValid;
};
