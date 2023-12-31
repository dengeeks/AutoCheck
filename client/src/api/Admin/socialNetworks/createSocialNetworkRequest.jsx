import axios from 'axios'
import { toast } from 'react-toastify';


export const createSocialNetwork = ({ social_network, link, qr_code, token }) => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
        
    axios.post(`${BASE_URL}/admin-panel/social-networks/`, {
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
        toast.success('Соц сеть успешно создана!');
    })
    .catch(error => {
        toast.error('Ошибка. Не удалось создать соц сеть');
    })
}