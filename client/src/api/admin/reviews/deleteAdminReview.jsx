import axios from 'axios'
import { toast } from 'react-toastify';


export const deleteReview = ({ id, token }) => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    
    axios.delete(`${BASE_URL}/admin-panel/reviews/${id}/`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then((response) => {
        toast.success(`Соц сеть успешно удалена`)
    })
    .catch(error => {
        toast.error(`Не удалось удалить соц сеть`)
    })
}