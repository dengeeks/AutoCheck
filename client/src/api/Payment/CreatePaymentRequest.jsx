import axios from "axios"
import { toast } from "react-toastify";


export const createPaymentRequest = ({ amount, return_url, setData, token }) => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;

    axios.post(`${BASE_URL}/yookassa/payment/`, {
        amount,
        return_url,
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    })
    .then((response) => {
        setData(response.data.payment_url)
    })
    .catch(error => {
        toast.error('Не удалось перенаправить на страницу пополнения')
    });
}