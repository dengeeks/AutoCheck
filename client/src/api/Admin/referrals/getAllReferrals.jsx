import axios from 'axios'
import { toast } from 'react-toastify';


export const getAdminAllReferrals = ({setData, token}) => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;

    axios.get(`${BASE_URL}/admin-panel/all-referrals/`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then((response) => {
        setData(response?.data)
    })
    .catch(error => {
        toast.error('Не удалось получить рефералов')
    })
}