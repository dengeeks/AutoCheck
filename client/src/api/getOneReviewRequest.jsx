import axios from 'axios'
import { toast } from "react-toastify";


export const getOneReviewRequest = ({ id, setData, setIsLoading }) => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;

    axios.get(`${BASE_URL}/reviews/${id}`)
    .then((response) => {
        setData(response?.data)
        setIsLoading(false)
    })
    .catch(error => {
        toast.error('Ну удалось получить отзыв')
    })
}