import { createContext, useState, useEffect } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";


const AuthContext = createContext()

export default AuthContext

export const AuthProvider = ({children}) => {
    const [authTokens, setAuthTokens] = useState(localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    const [user, setUser] = useState(localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')) : null)
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()
    const BASE_URL = process.env.REACT_APP_BASE_URL;

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      }, []);

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
            setUser(jwtDecode(data.access))
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
            }
        });
    };

    const logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('user')
        localStorage.removeItem('authTokens')
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
            setUser(jwtDecode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
        })
        .catch(() => {
            logoutUser()
        })
        if (loading) {
            setLoading(false)
        }
    }

    const updateUser = (updatedData) => {
        console.log('update user updatedData: ', updatedData)
        setUser((prevUser) => {
          const newUser = { ...prevUser, ...updatedData };
          localStorage.setItem('user', JSON.stringify(newUser));
          return newUser;
        });
    };

    const contextData = {
        user: user,
        authTokens: authTokens,
        loginUser: loginUser,
        logoutUser: logoutUser,
        updateUser, updateUser,
    }
    console.log(user)

    useEffect(() => {
        if (loading) {
            updateToken()
        }

        const interval = setInterval(() => {
            if (authTokens) {
                updateToken()
            }
        }, (1000 * 60) * 14)
        return ()=> clearInterval(interval)
    // eslint-disable-next-line
    }, [authTokens, loading])

    return(
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}