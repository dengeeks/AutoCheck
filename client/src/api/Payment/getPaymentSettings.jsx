import axios from 'axios'
import { toast } from 'react-toastify';


export const getPaymentSettings = ({setData, setLoading}) => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;

    axios.get(`${BASE_URL}/payment-settings/`)
    .then((response) => {
        setData(response?.data)
        setLoading(false)
    })
    .catch(error => {
        toast.error('Не удалось получить настройки платежей')
    })
}