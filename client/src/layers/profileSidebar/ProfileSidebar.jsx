import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, NavLink, Outlet, Link } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import { Box, List, ListItem, Typography } from '@mui/material';

import Diversity3Icon from '@mui/icons-material/Diversity3';
import RestoreIcon from '@mui/icons-material/Restore';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PasswordIcon from '@mui/icons-material/Password';
import LogoutIcon from '@mui/icons-material/Logout';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import RestorePageIcon from '@mui/icons-material/RestorePage';
import SettingsIcon from '@mui/icons-material/Settings';
import './ProfileSidebar.css'

const ProfileSidebar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const {user, logoutUser} = useContext(AuthContext)
    const BASE_URL_WITHOUT_PREFIX = process.env.REACT_APP_BASE_URL_WITHOUT_PREFIX;
    const navigate = useNavigate()

    useEffect(() => {
        if (!user) {
            navigate('/login')
        }
    }, [user])        

    return(
    <Box sx={{ display: 'flex' }}>
        <Box className='profile-sidebar-container'>
            <List>
                <ListItem className='profile-sidebar-user-item'>
                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                        <img src={`${BASE_URL_WITHOUT_PREFIX}/${user?.avatar}`} alt="Аватарка" className='profile-user-avatar' />
                        <Box>
                            <Typography className='profile-user-account'>Баланс: <span className='profile-user-account-price'>0.00₽</span></Typography>
                            <Typography className='profile-user-account'>{user?.first_name} {user?.last_name}</Typography>
                        </Box> 
                    </Box>
                    <Box sx={{ marginTop: '10px', width: '100%', textAlign: 'left' }}>
                        <Typography className='profile-user-account'>Количество отчетов: {user?.request_quantity}</Typography>
                        <Typography className='profile-user-account'>
                            Тарифный план: <Link to='/'><span className='profile-user-request-quantity'>Выбрать</span></Link>
                        </Typography>  
                    </Box>   
                </ListItem> 
                <NavLink to='payment-history' style={{ color: '#000', textDecoration: 'none' }}>
                    <ListItem className='profile-sidebar-item'>
                        <RestoreIcon />
                        <Typography className='profile-item-text'>История платежей</Typography>
                    </ListItem>
                </NavLink>
                <NavLink to='referral-system' style={{ color: '#000', textDecoration: 'none' }}>
                    <ListItem className='profile-sidebar-item'>
                        <Diversity3Icon />
                        <Typography className='profile-item-text'>Реферальная система</Typography>
                    </ListItem>
                </NavLink>
                <NavLink to='inspection-history' style={{ color: '#000', textDecoration: 'none' }}>
                    <ListItem className='profile-sidebar-item'>
                        <RestorePageIcon />
                        <Typography className='profile-item-text'>История проверок</Typography>
                    </ListItem>
                </NavLink>
                <NavLink to='favorites' style={{ color: '#000', textDecoration: 'none' }}>
                    <ListItem className='profile-sidebar-item'>
                        <FavoriteIcon />
                        <Typography className='profile-item-text'>Избранное</Typography>
                    </ListItem>
                </NavLink>
                <NavLink to='ticket-system' style={{ color: '#000', textDecoration: 'none' }}>
                    <ListItem className='profile-sidebar-item'>
                        <ConfirmationNumberIcon />
                        <Typography className='profile-item-text'>Тикетная система</Typography>
                    </ListItem>
                </NavLink>
                <NavLink to='/settings' style={{ color: '#000', textDecoration: 'none' }}>
                    <ListItem className='profile-sidebar-item'>
                        <SettingsIcon />
                        <Typography className='profile-item-text'>Настройки аккаунта</Typography>
                    </ListItem>
                </NavLink>
                <NavLink to='/' style={{ color: '#000', textDecoration: 'none' }}> 
                {/*TODO add scroll to #faq */}
                    <ListItem className='profile-sidebar-item'>
                        <QuestionMarkIcon />
                        <Typography className='profile-item-text'>Вопросы и ответы</Typography>
                    </ListItem>
                </NavLink>
                <NavLink to='/forget-password' style={{ color: '#000', textDecoration: 'none' }}>
                    <ListItem className='profile-sidebar-item'>
                        <PasswordIcon />
                        <Typography className='profile-item-text'>Сменить пароль</Typography>
                    </ListItem>
                </NavLink>
                <ListItem className='profile-sidebar-item' onClick={logoutUser}>
                    <LogoutIcon />
                    <Typography className='profile-item-text'>Выйти</Typography>
                </ListItem>
            </List>
        </Box>
        <Box sx={{ flex: 1 }}>
            <Outlet></Outlet>
        </Box>
    </Box>
  )

}

export default ProfileSidebar