import axios from 'axios'
import { toast } from 'react-toastify';


export const createContact = ({ name, info, token }) => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
        
    axios.post(`${BASE_URL}/admin-panel/contacts/`, {
        name: name,
        info: info,
    },{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    .then((response) => {
        toast.success('Соц сеть успешно создана!');
    })
    .catch(error => {
        toast.error('Ошибка. Не удалось создать соц сеть');
        console.log(error)
    })
}