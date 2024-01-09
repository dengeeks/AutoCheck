import axios from 'axios'
import { toast } from 'react-toastify';


export const createTicketAnswer = ({ ticket_id, text, token }) => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;

    axios.post(`${BASE_URL}/ticket-answers/`, {
        ticket: ticket_id,
        text: text,
    },{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    .then((response) => {
        toast.success('Ответ на тикет успешно создан!');
    })
    .catch(error => {
        toast.error('Ошибка. Не удалось создать ответ на тикет');
    })
}