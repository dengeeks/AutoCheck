import { Box, Typography, Button } from "@mui/material"
import PasswordField from "../PasswordField/PasswordField"
import { useParams, useNavigate } from "react-router-dom"
import { confirmPasswordReset } from "../../../api/confirmPasswordReset"
import '../AuthFormStyle.css'
import { validatePassword } from "../../../utils/FieldValidation"
import { useState } from "react"


const ChangePasswordForm = () => {
    const [newPassword, setNewPassword] = useState()
    const [newPassword1, setNewPassword1] = useState()
    const [error, setError] = useState('')
    const {uid, token} = useParams()
    const navigate = useNavigate()

    const handleResetPassword = () => {
        if (newPassword === newPassword1) {
            const passwordValidation = validatePassword(newPassword)
            if (passwordValidation) {
                setError(passwordValidation)
            } else {
                confirmPasswordReset({uid: uid, token: token, password: newPassword})
                navigate('/login')
            }
        } else {
            setError('Пароли не совпадают')
        }
    }
    return(
        <Box className='auth-form-container'>
            <Box className='auth-form-header'>
                <Typography className='form-header-text' >Новый пароль</Typography>
            </Box>
            <Box className='auth-fields-container'>
                <PasswordField label='Пароль' error={error} onChange={(e) => setNewPassword(e.target.value)} />
                <PasswordField label='Повторите пароль' error={error} onChange={(e) => setNewPassword1(e.target.value)} />
                <Button className='auth-form-button' onClick={handleResetPassword}>Отправить</Button>
            </Box>
        </Box>
    )
}

export default ChangePasswordForm