import axios from 'axios'
import { toast } from 'react-toastify';


export const getAdminReviews = ({setData, token}) => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;

    axios.get(`${BASE_URL}/admin-panel/reviews/`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then((response) => {
        console.log(response?.data?.results, 'lasdjfl')
        setData(response?.data?.results)
    })
    .catch(error => {
        console.log('ERROR')
        toast.error('Не удалось получить отзывы')
    })
}