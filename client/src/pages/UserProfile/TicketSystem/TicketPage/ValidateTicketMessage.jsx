import { validateImageSize } from "../../../../utils/FieldValidation";

export const validateTicketMessage = ({ selectedFiles, setError }) => {
    let isValid = true;
    let newError = { selectedFiles: '' };

    // Validate files size
    newError.selectedFiles = validateImageSize(selectedFiles);
    if (newError.selectedFiles) {
        isValid = false;
    }

    setError(newError);
    return isValid;
};