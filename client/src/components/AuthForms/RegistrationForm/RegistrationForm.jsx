import { Box, TextField, Typography, Button } from "@mui/material"
import { useState, useEffect } from "react"
import PasswordField from "../PasswordField/PasswordField"
import { Link, useParams, useNavigate } from "react-router-dom"
import '../AuthFormStyle.css'
import { validateRegistrationForm } from "./RegistrationFormValidate"
import { registrationRequest } from "../../../api/Auth/registrationRequest"


const RegistrationForm = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password1, setPassword1] = useState('')
    const [isSuccess, setIsSuccess] = useState(false)

    const {referral_code} = useParams()
    const navigate = useNavigate()

    const [error, setError] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

    const handleSubmitForm = () => {
        if (password === password1) {
          if (validateRegistrationForm(firstName, lastName, email, password, setError)) {
            registrationRequest({
                first_name: firstName,
                last_name: lastName,
                email: email,
                password: password,
                referral: referral_code,
                setIsSuccess: setIsSuccess,
            })
          }
        } else {
            setError({ ...error, password: 'Пароли не совпадают' });
        }
    };

    useEffect(() => {
        if (isSuccess) {
            navigate('/login')
        }
    }, [isSuccess, navigate])

    return(
        <Box className='auth-form-container'>
            <Box className='auth-form-header'>
                <Typography className='form-header-text'>Регистрация</Typography>
            </Box>
            <Box className='auth-fields-container'>
                <TextField
                    size='small'
                    className='auth-field'
                    label='Имя'
                    error={!!error.firstName}
                    helperText={error.firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <TextField
                    size='small'
                    className='auth-field'
                    label='Фамилия'
                    error={!!error.lastName}
                    helperText={error.lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
                <TextField
                    size='small'
                    className='auth-field'
                    label='Почта'
                    error={!!error.email}
                    helperText={error.email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <PasswordField 
                    label='Пароль'
                    error={error.password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <PasswordField
                    label='Повтор пароля'
                    error={error.password}
                    onChange={(e) => setPassword1(e.target.value)}
                />
                <Button className='auth-form-button' onClick={handleSubmitForm}>Отправить</Button>

                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    marginTop: '10px', 
                    textAlign: 'center', 
                    justifyContent: 'center'
                }}>
                    <Typography sx={{ fontSize: '14px', marginRight: '5px'}}>Уже зарегестрированы?</Typography> 
                    -
                    <Link to='/login'>
                        <Typography sx={{ fontSize: '14px', marginLeft: '5px'}}>Авторизоваться</Typography> 
                    </Link> 
                </Box>
            </Box>
        </Box>
    )
}

export default RegistrationForm