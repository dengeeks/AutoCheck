import axios from 'axios'
import { toast } from 'react-toastify';

export const getOneContact = ({ id, token, setData }) => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    
    axios.get(`${BASE_URL}/admin-panel/contacts/${id}/`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then((response) => {
        setData(response?.data)
    })
    .catch(error => {
        toast.error(`Не удалось получить контакт`)
    })
}