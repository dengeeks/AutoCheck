import axios from 'axios'
import { toast } from "react-toastify";


export const getBalanceHistory = ({ setData, token }) => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;

    axios.get(`${BASE_URL}/balance-history/`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then((response) => {
        setData(response.data.results)
    })
    .catch(error => {
        toast.error('Не удалось получить историю баланса')
    })
}