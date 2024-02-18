import axios from 'axios'
import { toast } from "react-toastify";


export const getFavoriteReportList = ({ setData, token }) => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;

    axios.get(`${BASE_URL}/reports/favorite/list/`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then((response) => {
        setData(response?.data?.results)
    })
    .catch(error => {
        toast.error('Не удалось получить отчеты')
    })
}