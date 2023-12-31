import axios from 'axios'
import { toast } from 'react-toastify';


export const sendMailing = ({ subject, message, user_id, token }) => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
        
    axios.post(`${BASE_URL}/admin-panel/mailing/`, { 
        user_id: user_id,
        subject: subject,
        message: message,
    },{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    .then((response) => {
        toast.success('Сообщения успешно отправлены!');
    })
    .catch(error => {
        toast.error('Ошибка. Не удалось отправить сообщения');
    })
}