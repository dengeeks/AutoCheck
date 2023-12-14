import axios from 'axios';
import { toast } from 'react-toastify';

export const sendFeedbackEmailApi = ({ email_from, subject, message, files, token, setSuccess }) => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;

    const formData = new FormData();
    formData.append('email_from', email_from);
    formData.append('subject', subject);
    formData.append('message', message);

    // Append each file to the FormData
    files.forEach((file, index) => {
        formData.append(`files[${index}]`, file);
    });

    axios.post(`${BASE_URL}/send-email/`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`, // Set the correct content type
        },
    })
        .then((response) => {
            setSuccess(true)
            toast.success('Успешно отправлено');
        })
        .catch((error) => {
            toast.error('Произошла ошибка, попробуйте позже');
        });
};
