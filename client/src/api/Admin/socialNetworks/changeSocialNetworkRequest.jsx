import axios from 'axios'
import { toast } from 'react-toastify';


export const changeSocialNetwork = ({ id, social_network, link, qr_code, token }) => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    
    axios.patch(`${BASE_URL}/admin-panel/social-networks/${id}/`, {
        social_network: social_network,
        link: link,
        qr_code: qr_code,
    },{
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
        }
    })
    .then((response) => {
        toast.success('Соц сеть успешно изменена!');
    })
    .catch(error => {
        toast.error('Ошибка. Не удалось изменить соц сеть');
    })
}