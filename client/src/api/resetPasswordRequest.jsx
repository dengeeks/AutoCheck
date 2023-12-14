import axios from "axios"
import { toast } from "react-toastify";

export const resetPasswordRequest = (email) => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;

    axios.post(`${BASE_URL}/auth/users/reset_password/`, {
        email: email,
    }, {
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then((response) => {
        console.log(response)
        toast.success('Ссылка для смены пароля отправлена на ваш Email');
    })
    .catch((error) => {
        toast.error('Не удалось отправить ссылку на ваш Email');
    })
}