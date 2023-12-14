import axios from 'axios'
import { toast } from 'react-toastify';


export const createContact = ({ social_network, link, qr_code, token }) => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
        
    axios.post(`${BASE_URL}/admin-panel/tariff/`, {
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
        toast.success('Контакт успешно создан!');
    })
    .catch(error => {
        toast.error('Ошибка. Не удалось создать контакт');
    })
}