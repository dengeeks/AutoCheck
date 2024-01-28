import axios from 'axios'
import { toast } from "react-toastify";


export const getTicketDetail = ({ id, token, setData, isLoading }) => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;

    axios.get(`${BASE_URL}/tickets/${id}/`,{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then((response) => {
        setData(response.data)
        isLoading(false)
    })
    .catch(error => {
        toast.error('Не удалось получить информацию')
    })
}