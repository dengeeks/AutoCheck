import axios from 'axios'
import { toast } from 'react-toastify';


export const changeWebsiteLogo = ({ logo, token }) => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;

    const formData = new FormData();
    formData.append('logo', logo);
    
    axios.put(`${BASE_URL}/admin-panel/change-logo/`, { logo: logo },{
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
        }
    })
    .then((response) => {
        toast.success('Настройки успешно применены!');
    })
    .catch(error => {
        toast.error('Ошибка. Не удалось применить настройки');
    })
}