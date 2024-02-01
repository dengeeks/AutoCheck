import axios from 'axios'
import {toast} from 'react-toastify'


export const CreateUserPurchase = ({ tariff_id, updateUser, token }) => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    
    axios.post(`${BASE_URL}/create-purchase/`, {
        tariff: tariff_id,
    },{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    .then((response) => {
        updateUser()
        toast.success('Вы успешно приобрели тариф!');
    })
    .catch(error => {
        toast.error('Не удалось приобрести тариф');
    })
}