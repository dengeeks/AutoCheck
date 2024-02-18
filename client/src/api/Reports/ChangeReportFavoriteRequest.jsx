import axios from 'axios'
import {toast} from 'react-toastify'


export const changeReportFavorite = ({uuid, is_favorite, token}) => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    
    axios.post(`${BASE_URL}/report-change/${uuid}/`, 
        {is_favorite: is_favorite}, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
}