import axios from 'axios'
import { toast } from 'react-toastify';


export const UpdateUserInfo = ({ first_name, last_name, avatar, email, password, token, updateUser }) => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const BASE_URL_WITHOUT_PREFIX = process.env.REACT_APP_BASE_URL_WITHOUT_PREFIX;

    const requestData = {
        first_name: first_name,
        last_name: last_name,
        email: email,
        avatar: avatar,
    };
    
    // Add password field if not empty or null
    if (password !== null && password?.trim() !== '') {
        requestData.password = password;
    }

    axios.patch(`${BASE_URL}/update-user/`, requestData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
        }
    })
    .then((response) => {
        if (response.data.avatar.startsWith(BASE_URL_WITHOUT_PREFIX)) {
            const user_avatar = response.data.avatar.substring(BASE_URL_WITHOUT_PREFIX.length);
            updateUser({
                first_name: response.data.first_name,
                last_name: response.data.last_name,
                email: response.data.email,
                avatar: user_avatar,
            })
        } else {
            updateUser({
                first_name: response.data.first_name,
                last_name: response.data.last_name,
                email: response.data.email,
                avatar: response.data.avatar,
            })
        }
        toast.success('Ваш профиль успешно изменен!');
    })
    .catch(error => {
        console.log(error)
        toast.error('Ошибка. Не удалось изменить профиль');
    })
}