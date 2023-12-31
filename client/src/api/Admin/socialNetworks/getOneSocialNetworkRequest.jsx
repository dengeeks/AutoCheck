import axios from 'axios'
import { toast } from 'react-toastify';

export const getOneSocialNetwork = ({ id, token, setData, setLoading }) => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    
    axios.get(`${BASE_URL}/admin-panel/social-networks/${id}/`, {
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