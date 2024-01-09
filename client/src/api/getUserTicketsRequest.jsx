import axios from 'axios'
import { toast } from 'react-toastify';


const getUserTicketsRequest = ({setData, setIsLoading, token}) => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;

    axios.get(`${BASE_URL}/tickets/`, {
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

export default getUserTicketsRequest