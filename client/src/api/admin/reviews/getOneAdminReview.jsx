import axios from 'axios'
import { toast } from 'react-toastify';

export const getOneReview = ({ id, token, setData, setLoading }) => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    
    axios.get(`${BASE_URL}/admin-panel/reviews/${id}/`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then((response) => {
        setData(response?.data)
        setLoading(false)
    })
    .catch(error => {
        toast.error(`Не удалось получить соц сеть`)
    })
}