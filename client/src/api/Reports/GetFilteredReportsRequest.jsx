import axios from 'axios'
import { toast } from "react-toastify";


export const getFilteredReports = ({ setData, bodyCode, token }) => {
    console.log('token', token)
    const BASE_URL = process.env.REACT_APP_BASE_URL;

    axios.get(`${BASE_URL}/reports/list/?body=${bodyCode}`, {
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
