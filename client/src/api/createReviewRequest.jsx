import axios from 'axios'
import {toast} from 'react-toastify'


export const createReviewRequest = ({user, text, convenience, informativeness, quality, tokens}) => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    
    axios.post(`${BASE_URL}/reviews/`, {
        user: user,
        text: text,
        convenience_rating: convenience,
        informativeness_rating: informativeness,
        quality_rating: quality,
    },{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokens}`
        }
    })
    .then((response) => {
        toast.success('Отзыв успешно отправлен!');
    })
    .catch(error => {
        toast.error('Произошла ошибка при отпраке отзыва');
    })
}