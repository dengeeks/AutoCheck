import axios from 'axios'
import { toast } from "react-toastify";


export const getTicketDetailAdmin = ({ id, setData, isLoading, token }) => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;

    axios.get(`${BASE_URL}/admin-panel/tickets/${id}/`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then((response) => {
        setData(response.data)
        isLoading(false)
        console.log(response.data)
    })
    .catch(error => {
        toast.error('Не удалось получить информацию по тикету')
    })
}