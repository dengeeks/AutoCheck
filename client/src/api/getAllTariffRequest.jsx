import axios from 'axios'
import { toast } from "react-toastify";


export const getAllTariffRequest = ({ setData }) => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;

    axios.get(`${BASE_URL}/tariff-plans/`)
    .then((response) => {
        setData(response.data.results)
    })
    .catch(error => {
        toast.error('Не удалось получить тарифы')
    })
}