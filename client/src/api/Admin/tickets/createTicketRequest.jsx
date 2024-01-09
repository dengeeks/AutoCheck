import axios from 'axios'
import { toast } from 'react-toastify';


export const createTicketRequest = ({ subject, text, token }) => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;

    axios.post(`${BASE_URL}/tickets/`, {
        subject: subject,
        text: text,
    },{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    .then((response) => {
        toast.success('Тикет успешно создан!');
    })
    .catch(error => {
        toast.error('Ошибка. Не удалось создать тикет');
    })
}