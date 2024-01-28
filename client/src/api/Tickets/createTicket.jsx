import axios from 'axios'
import {toast} from 'react-toastify'


export const createTicket = ({subject, token}) => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    
    axios.post(`${BASE_URL}/tickets/`, {
        subject: subject,
    },{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    .catch(error => {
        toast.error('Произошла ошибка при создании тикета');
    })
}