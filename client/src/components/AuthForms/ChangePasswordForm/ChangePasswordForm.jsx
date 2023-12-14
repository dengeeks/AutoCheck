import { Box, Typography, Button } from "@mui/material"
import PasswordField from "../PasswordField/PasswordField"
import '../AuthFormStyle.css'

const ChangePasswordForm = () => {
    return(
        <Box className='auth-form-container' sx={{  height: '300px'}}>
        <Box className='auth-form-header'>
            <Typography className='form-header-text'>Новый пароль</Typography>
        </Box>
        <Box className='auth-fields-container'>
            <PasswordField label='Пароль' />
            <PasswordField label='Повторите пароль' />
            <Button className='auth-form-button'>Отправить</Button>
        </Box>
    </Box>
    )
}

export default ChangePasswordForm