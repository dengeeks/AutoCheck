import axios from 'axios'
import { toast } from 'react-toastify';

export const getAllBlockedUsers = ({ setData, token }) => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;

    return(
        axios.get(`${BASE_URL}/admin-panel/get-blocked-users/`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then((response) => {
            setData(response?.data?.results)
        })
        .catch(error => {
            toast.error(`Не удалось получить информацию о блокировке`)
        })
    )
}