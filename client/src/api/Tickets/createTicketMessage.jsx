import axios from 'axios'
import {toast} from 'react-toastify'


export const createTicketMessage = ({text, ticket, files, token, isSended}) => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;

    const formData = new FormData();
    formData.append('text', text);
    formData.append('ticket', ticket);

    for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i]);
    }

    axios.post(`${BASE_URL}/message/`, formData, {
        headers: {
            'Content-Type': 'multipart/formdata',
            'Authorization': `Bearer ${token}`
        }
    })
    .then(() => {
        isSended(true)
    })
    .catch(error => {
        toast.error('Произошла ошибка при отправке сообщения');
    })
}