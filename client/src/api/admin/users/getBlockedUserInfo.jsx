import axios from 'axios'
import { toast } from 'react-toastify';

export const getBlockedUserInfo = ({ id, setData }) => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    console.log(id, 'ID')
    return(
        axios.get(`${BASE_URL}/admin-panel/block-user/${id}/`)
        .then((response) => {
            setData(response?.data)
        })
        .catch(error => {
            console.log(error, 'ERERE')
            toast.error(`Не удалось получить информацию о блокировке`)
        })
    )
}