import axios from 'axios'
import {toast} from 'react-toastify'


export const activateUserRequest = ({ uid, token }) => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;

    axios.post(`${BASE_URL}/auth/users/activation/`, {
        uid: uid,
        token: token,
    }, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(() => {
        toast.success('Пользователь успешно активирован!');
    })
    .catch(() => {
        toast.error('Не удалось активировать пользователя');
    })
}