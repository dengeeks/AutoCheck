import axios from 'axios'
import { toast } from 'react-toastify';


export const deleteTariffPlan = ({ id, token }) => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    
    axios.delete(`${BASE_URL}/admin-panel/tariff/${id}/`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then((response) => {
        toast.success(`Запись номер ${id} успешно удалена`)
    })
    .catch(error => {
        toast.error(`Не удалось удалить запись номер ${id}`)
    })
}
    
