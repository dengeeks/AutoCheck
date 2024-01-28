import axios from 'axios'
import {toast} from 'react-toastify'

export const closeTicketRequest = ({ id, is_closed, token}) => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    
    axios.patch(`${BASE_URL}/tickets/${id}/`, {
        is_closed: is_closed,
    },{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    .catch(error => {
        toast.error('Произошла ошибка при закрытии тикета');
    })
}