import axios from 'axios'
import { toast } from 'react-toastify';


export const createTariffPlan = ({ id, name, price, request_quantity, token }) => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
        
    axios.post(`${BASE_URL}/admin-panel/tariff/`, {
        name: name,
        price: price,
        request_quantity: request_quantity,
    },{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    .then((response) => {
        toast.success('Тариф успешно создан!');
    })
    .catch(error => {
        toast.error('Ошибка. Не удалось создать тариф');
    })
}