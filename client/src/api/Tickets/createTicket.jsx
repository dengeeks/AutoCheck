import axios from 'axios'
import {toast} from 'react-toastify'


export const createTicket = ({subject, createdTicket, token}) => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    
    axios.post(`${BASE_URL}/tickets/`, {
        subject: subject,
    },{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        createdTicket(response?.data)
    })
    .catch(error => {
        toast.error('Произошла ошибка при создании тикета');
    })
}