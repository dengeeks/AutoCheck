import axios from 'axios'
import { toast } from 'react-toastify';


export const changeTariffPlan = ({ id, name, price, request_quantity, token }) => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    
    axios.patch(`${BASE_URL}/admin-panel/tariff/${id}/`, {
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
        toast.success('Тариф успешно изменен!');
    })
    .catch(error => {
        toast.error('Ошибка. Не удалось изменить тариф');
    })
}

export const getOneTariffPlan = ({ id, token, setData, setLoading }) => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    
    axios.get(`${BASE_URL}/admin-panel/tariff/${id}/`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then((response) => {
        console.log(response, 'tarif')
        setData(response?.data)
        setLoading(false)
    })
    .catch(error => {
        toast.error(`Не удалось получить тарифный план номер ${id}`)
    })
}
    