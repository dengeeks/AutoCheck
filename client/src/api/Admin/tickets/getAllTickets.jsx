import axios from 'axios'
import { toast } from 'react-toastify';


export const getAllTicketsRequest = ({ setData, setIsLoading, token }) => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;

    axios.get(`${BASE_URL}/get-all-tickets/`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then((response) => {
        setData(response?.data?.results)
        setIsLoading(false)
    })
    .catch(error => {
        toast.error('Не удалось получить тикеты')
    })
}