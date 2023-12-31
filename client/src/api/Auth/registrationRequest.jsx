import axios from "axios"
import { toast } from "react-toastify";


export const registrationRequest = ({ first_name, last_name, email, password, referral, setIsSuccess }) => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;

    axios.post(`${BASE_URL}/auth/users/`, {
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: password,
        referral_code: referral || '',
    }, {
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then((response) => {
        toast.success('Пользователь успешно создан');
        toast.warning('Подтвердите вашу почту, мы отправили вам ссылку', {
            autoClose: 6000, // 6 sec
          });
        setIsSuccess(true)
    })
    .catch(error => {
        if (error.response) {
            toast.error('Пользователь с таким Email уже существует.');
        } else if (error.request) {
            toast.error('Произошла ошибка. Пожалуйста, попробуйте еще раз.');
        } else {
            
        }
    });
}