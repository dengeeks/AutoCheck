import axios from 'axios'
import { toast } from 'react-toastify';


const getTicketAndAnswerRequest = ({ id, setData, setIsLoading, token }) => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;

    axios.get(`${BASE_URL}/ticket-and-answer/${id}/`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then((response) => {
        setData(response?.data)
        setIsLoading(false)
    })
    .catch(error => {
        toast.error('Не удалось получить информацию по тикету')
        console.log(error)
    })
}

export default getTicketAndAnswerRequest