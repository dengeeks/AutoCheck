import axios from 'axios'
import { toast } from 'react-toastify';


export const getAdminSocialNetworks = ({setData, token}) => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;

    axios.get(`${BASE_URL}/admin-panel/social-networks/`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then((response) => {
        setData(response?.data?.results)
    })
    .catch(error => {
        toast.error('Не удалось получить соц. сети')
    })
}