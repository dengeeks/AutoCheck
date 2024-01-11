import axios from 'axios'
import { toast } from 'react-toastify';

export const getBlockedUserInfo = ({ id, setData, logout }) => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    return(
        axios.get(`${BASE_URL}/admin-panel/block-user/${id}/`)
        .then((response) => {
            setData(response?.data)
        })
        .catch(error => {
            toast.error(`Не удалось получить информацию о блокировке`)
            logout()
        })
    )
}