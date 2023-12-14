import axios from "axios"
import { toast } from "react-toastify";


export const registrationRequest = (firstName, lastName, email, password, setIsSuccess) => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;

    axios.post(`${BASE_URL}/auth/users/`, {
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
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