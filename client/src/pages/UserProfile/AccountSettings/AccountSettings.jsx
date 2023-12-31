import { Container, Box, TextField, Button, Typography } from "@mui/material"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import './AccountSettings.css'
import { useContext } from "react";
import AuthContext from "../../../context/AuthContext";


const AccountSettings = () => {
    const {user} = useContext(AuthContext)
    const BASE_URL_WITHOUT_PREFIX = process.env.REACT_APP_BASE_URL_WITHOUT_PREFIX;

    return(
        <Container className='profile-settings-container'>
            <Typography className='profile-settings-title' sx={{textAlign: 'center'}}>Настройки аккаунта</Typography>
            <Box>
                <Typography className='profile-settings-avatar-title'>
                    Аватарка профиля
                </Typography>
                <Box>
                    <img src={`${BASE_URL_WITHOUT_PREFIX}${user?.avatar}`} className='profile-settings-avatar-img' alt="" />
                </Box>
                <Button className='profile-settings-avatar'>
                    Изменить аватар <AccountCircleIcon sx={{ marginLeft: '15px' }} />
                </Button>
            </Box>
            <Box>
                <Typography className='profile-settings-second-title'>Личные данные</Typography>
            </Box>
            <Box className='profile-settings-outer-container' sx={{ display: 'flex', flexDirection: 'column' }}>
                <Box className='profile-settings-inner-container' sx={{ display: 'flex', flexDirection: 'row' }}>
                    <TextField className='profile-settings-field' label='Имя'></TextField>
                    <TextField className='profile-settings-field' label='Фамилия'></TextField>
                </Box>
                <Box className='profile-settings-inner-container' sx={{ display: 'flex', flexDirection: 'row' }}>
                    <TextField className='profile-settings-field-email' label='E-mail'></TextField>
                </Box>
            </Box>
            <Typography className='profile-settings-change-title'>Сменить пароль</Typography>
            <Box className='profile-settings-inner-container' sx={{ display: 'flex', flexDirection: 'row' }}>
                <TextField className='profile-settings-field' label='Новый пароль'></TextField>
                <TextField className='profile-settings-field' label='Повтор пароля'></TextField>
            </Box>
            <Box className='profile-settings-btns'>
                <Button className='profile-settings-save-changes'>
                    Сохранить изменения
                </Button>
                <Button className='profile-settings-exit'>
                    Выйти
                </Button>     
            </Box>
        </Container>
    )
}

export default AccountSettings