import axios from 'axios'
import { toast } from "react-toastify";


export const getReportDetailRequest = ({ uuid, setData, setExpire, token }) => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;

    axios.get(`${BASE_URL}/report/detail/${uuid}/`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then((response) => {
        setData(response.data)
    })
    .catch(error => {
        console.log(error, 'error')
        if (error.response.status === 403) {
            setExpire(true)
        } else {
            toast.error('Не удалось получить отчет')
        }
    })
}