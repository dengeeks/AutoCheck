import axios from 'axios'
import { toast } from 'react-toastify';


export const adminChangeUserPassword = ({ id, password, token }) => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    
    axios.patch(`${BASE_URL}/admin-panel/change-custom-user/${id}/`, {
        password: password,
    },{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    .then((response) => {
        toast.success('Пароль успешно изменен!');
    })
    .catch(error => {
        toast.error('Ошибка. Не удалось изменить пароль');
    })
}