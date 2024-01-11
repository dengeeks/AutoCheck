import { createContext, useState, useEffect } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import getUserInfoRequest from "../api/User/getUserInfoRequest";


const AuthContext = createContext()

export default AuthContext

export const AuthProvider = ({children}) => {
    const [authTokens, setAuthTokens] = useState(localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    const [userData, setUserData] = useState(localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : null);
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()
    const BASE_URL = process.env.REACT_APP_BASE_URL;


    const loginUser = ({ email, password }) => {
        axios.post(`${BASE_URL}/token/`, {
          email: email,
          password: password,
        }, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then(response => {
            const data = response.data;
            setAuthTokens(data)
            localStorage.setItem('authTokens', JSON.stringify(data))
            navigate('/')
        })
        .catch(error => {
            if (error.response) {
                toast.error('Пожалуйста, проверьте введенные данные.');
            } else if (error.request) {
                toast.error('Произошла ошибка при входе. Пожалуйста, попробуйте еще раз.');
            } else {
                toast.error('Произошла непредвиденная ошибка при входе.');
                console.log(error)
            }
        });
    };

    const logoutUser = () => {
        setAuthTokens(null)
        localStorage.removeItem('authTokens')

        setUserData(null)
        localStorage.removeItem('userData')

        navigate('/login')
    }

    const updateToken = () => {
        axios.post(`${BASE_URL}/token/refresh/`, {
            refresh: authTokens?.refresh
        },{
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((response) => {            
            const data = response.data
            setAuthTokens(data)
            localStorage.setItem('authTokens', JSON.stringify(data))
        })
        .catch(() => {
            logoutUser()
        })
        if (loading) {
            setLoading(false)
        }
    }

    
    const getUserInfo = () => {
        if (authTokens) {
            axios.get(`${BASE_URL}/get-user-info/`, {
                headers: {
                    'Authorization': `Bearer ${authTokens.access}`
                }
            })
            .then((response) => {
                const userInfo = response.data.results[0];
                setUserData(userInfo);
                localStorage.setItem('userData', JSON.stringify(userInfo));
            })
            .catch(error => {
                if (error.response.status === 401) {
                    logoutUser()
                }
                console.log(error, error.status)
                toast.error('Не удалось получить информацию пользователя')
            });
        }
    };

    const updateUserInfo = () => {
        // Вызываем getUserInfo для обновления данных пользователя
        getUserInfo();
    };

    const contextData = {
        authTokens: authTokens,
        user: userData,
        loginUser: loginUser,
        logoutUser: logoutUser,
        updateUser: updateUserInfo,
    }
 
    useEffect(() => {
        if (loading) {
            updateToken();
        }

        const interval = setInterval(() => {
            if (authTokens) {
                updateToken();
            }
        }, (1000 * 60) * 14);

        return () => clearInterval(interval);
    // eslint-disable-next-line
    }, [authTokens, userData, loading]);

    useEffect(() => {
        if (!userData) {
            getUserInfo();
        }
    }, [authTokens]);

    return(
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}