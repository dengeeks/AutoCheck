import axios from 'axios'
import { toast } from "react-toastify";


export const getTicketsAdmin = ({ setData, isLoading, token }) => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;

    axios.get(`${BASE_URL}/admin-panel/tickets/`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then((response) => {        
        setData(response.data.results)
        isLoading(false)
    })
    .catch(error => {
        toast.error('Не удалось получить тикеты')
    })
}