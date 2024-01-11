import axios from 'axios'
import { toast } from "react-toastify";


const getUserInfoRequest = ({ setData, token, logoutUser }) => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;

    axios.get(`${BASE_URL}/get-user-info/`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then((response) => {
        const userInfo = response.data.results[0];
        setUserData(userInfo);
        localStorage.setItem('userData', JSON.stringify(userInfo));
    })
    .catch(error => {
        if (error.response.status === 401) {
            logoutUser()
        }
        toast.error('Не удалось получить информацию пользователя')

    });
}

export default getUserInfoRequest