import axios from 'axios'
import { toast } from "react-toastify";


export const getReferralRequest = ({ token, setData, isLoading }) => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;

    axios.get(`${BASE_URL}/referrals/`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then((response) => {
        setData(response.data.data)
        isLoading(false)
    })
    .catch(error => {
        toast.error('Не удалось получить рефералов')
    })
}