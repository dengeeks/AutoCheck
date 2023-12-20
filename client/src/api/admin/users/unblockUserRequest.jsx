import axios from 'axios'
import { toast } from 'react-toastify';


export const unblockUser = ({ user, token }) => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    
    axios.post(`${BASE_URL}/admin-panel/unblock-user/`, {
        user: user,
    },{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    .then((response) => {
        toast.success(`Пользователь успешно разблокирован`);
    })
    .catch(error => {
        console.log(error, 'eERERER')
        toast.error('Не удалось разблокировать пользователя');
    })
}