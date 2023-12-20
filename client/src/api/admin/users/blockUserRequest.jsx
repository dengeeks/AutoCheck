import axios from 'axios'
import { toast } from 'react-toastify';


export const blockUser = ({ id, block_reason, block_duration_hours, block_duration_days, token }) => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    
    axios.post(`${BASE_URL}/admin-panel/block-user/`, {
        user: id,
        block_reason: block_reason,
        block_duration_days: block_duration_days,
    },{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    .then((response) => {
        toast.success(`Пользователь успешно заблокирован`);
    })
    .catch(error => {
        toast.error('Не удалось заблокировать пользователя');
    })
}