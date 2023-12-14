import React, {useContext, useState} from "react"
import { TextField, Box, Typography, Button } from "@mui/material"
import { Link } from "react-router-dom"
import PasswordField from "../PasswordField/PasswordField"
import '../AuthFormStyle.css'
import AuthContext from "../../../context/AuthContext"
import { validateLoginForm } from "./ValidateLoginForm"


const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState({ email: '', password: '' });
    const {loginUser} = useContext(AuthContext)

    const handleLoginSubmit = () => {
        if (validateLoginForm(email, password, setError)) {
            // Call loginUser with the form data
            loginUser({email, password})
        }
    };

    return(
        <Box className='auth-form-container' sx={{  minHeight: '300px'}}>
        <Box className='auth-form-header'>
            <Typography className='form-header-text'>Авторизация</Typography>
        </Box>
        <Box className='auth-fields-container'>
            <TextField 
                size='small' 
                className='auth-field' 
                label='Почта'
                onChange={(e) => setEmail(e.target.value)}    
                error={!!error.email}
                helperText={error.email} 
            />
            <PasswordField label='Пароль' error={error.password} onChange={(e) => setPassword(e.target.value)} />

            <Button className='auth-form-button' onClick={handleLoginSubmit}>Войти</Button>
            <Box sx={{ display: 'flex', flexDirection: 'row', marginTop: '5px', textAlign: 'center', justifyContent: 'center'}}>
                <Link to='/forget-password'>
                    <Typography sx={{ fontSize: '14px', marginRight: '5px'}}>Забыл пароль?</Typography> 
                </Link>
                |
                <Link to='/registration'>
                    <Typography sx={{ fontSize: '14px', marginLeft: '5px' }}>Регистрация</Typography> 
                </Link>
            </Box>
        </Box>
    </Box>
    )
}

export default LoginForm