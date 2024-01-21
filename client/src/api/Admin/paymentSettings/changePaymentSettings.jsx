import axios from 'axios'
import { toast } from 'react-toastify';


export const changePaymentSettings = ({ commission, token }) => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    
    axios.put(`${BASE_URL}/admin-panel/change-payment-settings/`, {
        commission: commission,
    },{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    .then((response) => {
        toast.success('Настройки успешно применены!');
    })
    .catch(error => {
        toast.error('Ошибка. Не удалось применить настройки');
    })
}