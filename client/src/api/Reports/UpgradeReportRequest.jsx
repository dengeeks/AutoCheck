import axios from 'axios'
import {toast} from 'react-toastify'


export const upgradeReportRequest = ({uuid, token}) => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    
    axios.post(`${BASE_URL}/report/upgrade/${uuid}/`, {}, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    .then((response) => {
        toast.success('Полный отчет создан');
    })
    .catch(error => {
        toast.error('Произошла ошибка при получении отчета');
    })
}