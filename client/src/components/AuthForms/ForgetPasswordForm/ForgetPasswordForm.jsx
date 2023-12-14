import { Box, Typography, TextField, Button } from "@mui/material"
import { Link } from "react-router-dom"
import { resetPasswordRequest } from "../../../api/resetPasswordRequest"
import '../AuthFormStyle.css'
import { useState } from "react"
import { validateResetPasswordForm } from "./ValidateResetForm"


const ForgetPasswordForm = () => {
    const [email, setEmail] = useState('')
    const [error, setError] = useState({ email: '' });

    const handleResetSubmit = () => {
        if (validateResetPasswordForm(email, setError)) {
            resetPasswordRequest(email)
        }
    };


    return(
        <Box className='auth-form-container' sx={{  height: '340px' }}>
            <Box className='auth-form-header'>
                <Typography className='form-header-text'>Восстановление пароля</Typography>
            </Box>
            <Box className='forget-password-container'>
                <Typography className="forget-password-text" sx={{ color: 'black', marginBottom: '-10px' }}>
                    Введите свой E-mail которого указывали при регистрации, на него будет выслан новый пароль:
                </Typography>
            </Box>
            
            <Box className='auth-fields-container' sx={{ marginTop: '0px' }}>
                <TextField
                    size='small'
                    className='auth-field'
                    label='Почта'
                    onChange={(e) => setEmail(e.target.value)}
                    error={error.email}
                    helperText={error.email}
                />
            
                <Button className='auth-form-button' onClick={handleResetSubmit}>Отправить</Button>
                <Box sx={{ display: 'flex', flexDirection: 'row', marginTop: '12px', textAlign: 'center', justifyContent: 'center'}}>
                    <Link to='/login'>
                        <Typography sx={{ fontSize: '14px', marginRight: '5px'}}>Авторизоваться</Typography> 
                    </Link>
                    |
                    <Link to='/registration'>
                        <Typography sx={{ fontSize: '14px', marginLeft: '5px' }}>Зарегестрироваться</Typography> 
                    </Link>
                </Box>
            </Box>
        </Box>
    )
}

export default ForgetPasswordForm