import axios from 'axios'
import { toast } from 'react-toastify';


export const deleteSocialNetwork = ({ id, token }) => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    
    axios.delete(`${BASE_URL}/admin-panel/social-networks/${id}/`, {
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