import axios from 'axios'
import { toast } from 'react-toastify';


export const adminChangeUserInfo = ({ id, first_name, last_name, email, request_quantity, token }) => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    
    axios.patch(`${BASE_URL}/auth/users/${id}/`, {
        first_name: first_name,
        last_name: last_name,
        email: email,
        request_quantity: request_quantity,
    },{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    .then((response) => {
        toast.success('Пользователь успешно изменен!');
    })
    .catch(error => {
        toast.error('Ошибка. Не удалось изменить пользователя');
    })
}