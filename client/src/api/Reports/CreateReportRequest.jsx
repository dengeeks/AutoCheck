import axios from 'axios';
import { toast } from 'react-toastify';


export const createReportRequest = ({setUuid, code, codeType, token}) => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    
    axios.post(`${BASE_URL}/report/create/`, {
        query: code,
        code_type: codeType,
    },{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    .then((response) => {
        console.log(response)
        setUuid(response.data.uuid)
    })
    .catch(error => {
        console.log(error, 'create erro')
    })
}