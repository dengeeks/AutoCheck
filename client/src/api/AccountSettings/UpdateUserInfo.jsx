import axios from 'axios'
import { toast } from 'react-toastify';


export const UpdateUserInfo = ({ first_name, last_name, avatar, email, password, token, updateUser }) => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;

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
        toast.success('Ваш профиль успешно изменен!');
        updateUser()
    })
    .catch(error => {
        console.log(error)
        toast.error('Ошибка. Не удалось изменить профиль');
    })
}