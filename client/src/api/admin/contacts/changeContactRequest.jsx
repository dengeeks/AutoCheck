import axios from 'axios'
import { toast } from 'react-toastify';


export const changeContact = ({ id, social_network, link, qr_code, token }) => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    
    axios.patch(`${BASE_URL}/admin-panel/contacts/${id}/`, {
        social_network: social_network,
        link: link,
        qr_code: qr_code,
    },{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    .then((response) => {
        toast.success('Контакт успешно изменен!');
    })
    .catch(error => {
        toast.error('Ошибка. Не удалось изменить контакт');
    })
}