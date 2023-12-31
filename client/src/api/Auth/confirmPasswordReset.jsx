import axios from "axios"
import { toast } from "react-toastify";

export const confirmPasswordReset = ({ uid, token, password }) => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;

    axios.post(`${BASE_URL}/auth/users/reset_password_confirm/`, {
        uid: uid,
        token: token,
        new_password: password,
    }, {
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then((response) => {
        toast.success('Пароль успешно изменен');
    })
    .catch((error) => {
        toast.error('Не удалось изменить пароль');
    })
}