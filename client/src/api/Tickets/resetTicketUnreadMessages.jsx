import axios from 'axios'
import {toast} from 'react-toastify'


export const resetTicketUnreadMessages = ({id, token}) => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    
    axios.post(`${BASE_URL}/reset-ticket/${id}/`, {}, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    .catch(error => {
        toast.error('Не удалось пометить сообщения прочитаными. Ошибка')
    })
}