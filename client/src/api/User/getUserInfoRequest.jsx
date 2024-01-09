import axios from 'axios'
import { toast } from "react-toastify";


const getUserInfoRequest = ({ setData, token }) => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;

    axios.get(`${BASE_URL}/get-user-info/`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then((response) => {
        setData(response.data.results[0])
    })
    .catch(error => {
        if (error.status === 401) {
            console.log("UNAUTH ERROR")
        }
        console.log(error, error.status)
        toast.error('Не удалось получить информацию пользователя')
    })
}

export default getUserInfoRequest