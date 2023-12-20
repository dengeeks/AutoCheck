import axios from 'axios'
import { toast } from 'react-toastify';


export const changeReview = ({ id, is_allowed, token }) => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    
    axios.patch(`${BASE_URL}/admin-panel/reviews/${id}/`, {
        is_allowed: is_allowed,
    },{
        headers: {
            'Content-Type': 'application/json',
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