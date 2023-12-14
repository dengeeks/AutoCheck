import axios from 'axios'
import { toast } from 'react-toastify';


export const deleteContact = ({ id, token }) => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    
    axios.delete(`${BASE_URL}/admin-panel/contacts/${id}/`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then((response) => {
        toast.success(`Контакт успешно удален`)
    })
    .catch(error => {
        toast.error(`Не удалось удалить контакт`)
    })
}