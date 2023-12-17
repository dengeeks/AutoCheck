import axios from 'axios'
import { toast } from "react-toastify";


export const getReviewsRequest = ({ setData }) => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;

    axios.get(`${BASE_URL}/reviews/`)
    .then((response) => {
        setData(response.data)
    })
    .catch(error => {
        toast.error('Ну удалось получить отзывы')
    })
}