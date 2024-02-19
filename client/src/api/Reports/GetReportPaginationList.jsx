import axios from 'axios'
import { toast } from "react-toastify";


export const getReportPaginationList = ({ setData, url, token }) => {
    axios.get(`${url}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then((response) => {
        console.log(response)
        setData(response?.data)
    })
    .catch(error => {
        console.log(error)
        toast.error('Не удалось получить отчеты')
    })
}