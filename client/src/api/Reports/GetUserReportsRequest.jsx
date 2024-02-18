import axios from 'axios'
import { toast } from "react-toastify";


export const getUserReports = ({ setData, token }) => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;

    axios.get(`${BASE_URL}/reports/list/`, {
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