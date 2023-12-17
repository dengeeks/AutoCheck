import axios from 'axios'
import { toast } from 'react-toastify';


export const changeContactsRequest = ({ id, name, info, token }) => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    
    axios.patch(`${BASE_URL}/admin-panel/contacts/${id}/`, {
        name: name,
        info: info,
    },{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })
    .then((response) => {
        toast.success('Контакт успешно изменен!');
    })
    .catch(error => {
        toast.error('Ошибка. Не удалось изменить контакт');
    })
}