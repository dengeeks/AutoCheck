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
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import './ProfileSidebar.css';


const ProfileSidebar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const {user, logoutUser} = useContext(AuthContext)
    const BASE_URL_WITHOUT_PREFIX = process.env.REACT_APP_BASE_URL_WITHOUT_PREFIX;
    const navigate = useNavigate()

    useEffect(() => {
        if (!user) {
            navigate('/login')
           
        }
        handleNavbarClose()
    }, [user, navigate])

    const handleNavbarOpen = () => {
        setIsSidebarOpen(true)
    }

    const handleNavbarClose = () => {
        setIsSidebarOpen(false)
    }

    return(
    <Box sx={{ display: 'flex', marginTop: '20px' }}>
                    {isSidebarOpen && (
                <div
                    className="background-overlay"
                    onClick={handleNavbarClose}
                />
            )}
        <Box className={`profile-sidebar-container ${isSidebarOpen ? 'profile-sidebar-open' : 'profile-sidebar-closed'}`}>
            <List>
                <ListItem className='profile-sidebar-user-item'>
                    <Box className={`${isSidebarOpen ? 'profile-sidebar-header': 'profile-sidebar-header-closed'}`} sx={{ display: 'flex', flexDirection: 'row' }}>
                        <img src={`${BASE_URL_WITHOUT_PREFIX}${user?.avatar}`} alt="Аватарка" className={`user-avatar-border ${isSidebarOpen ? 'profile-user-avatar' : 'profile-user-avatar-closed'}`} />
                        {isSidebarOpen && (
                            <Box>
                                <Typography className='profile-user-account'>Баланс: <span className='profile-user-account-price'>0.00₽</span></Typography>
                                <Typography className='profile-user-account'>{user?.first_name} {user?.last_name}</Typography>
                            </Box>
                        )}

                        {isSidebarOpen ? 
                            <ArrowBackIcon 
                                className={`${isSidebarOpen ? 'profile-sidebar-icons-open' : 'profile-sidebar-icons-close'}`}
                                onClick={handleNavbarClose} 
                            /> 
                        : 
                            <ArrowForwardIcon 
                                className={`${isSidebarOpen ? 'profile-sidebar-icons-open' : 'profile-sidebar-icons-close'}`}
                                onClick={handleNavbarOpen} 
                            />}
                    </Box>
                    {isSidebarOpen && ( 
                        <Box sx={{ marginTop: '10px', width: '100%', textAlign: 'left' }}>
                            <Typography className='profile-user-account'>Количество отчетов: {user?.request_quantity}</Typography>
                            <Typography className='profile-user-account'>
                                Тарифный план: <Link to='/'><span className='profile-user-request-quantity'>Выбрать</span></Link>
                            </Typography>  
                        </Box>  
                    )}
 
                </ListItem> 
                <NavLink to='balance' style={{ color: '#000', textDecoration: 'none' }}>
                    <ListItem className='profile-sidebar-item'>
                        <AccountBalanceWalletIcon />
                        <Typography className={`profile-item-text ${isSidebarOpen ? '' : 'profile-item-text-close'}`}>Пополнить баланс</Typography>
                    </ListItem>
                </NavLink>
                <NavLink to='payment-history' style={{ color: '#000', textDecoration: 'none' }}>
                    <ListItem className='profile-sidebar-item'>
                        <RestoreIcon />
                        <Typography className={`profile-item-text ${isSidebarOpen ? '' : 'profile-item-text-close'}`}>История платежей</Typography>
                    </ListItem>
                </NavLink>
                <NavLink to='referral-system' style={{ color: '#000', textDecoration: 'none' }}>
                    <ListItem className='profile-sidebar-item'>
                        <Diversity3Icon />
                        <Typography className={`profile-item-text ${isSidebarOpen ? '' : 'profile-item-text-close'}`}>Реферальная система</Typography>
                    </ListItem>
                </NavLink>
                <NavLink to='inspection-history' style={{ color: '#000', textDecoration: 'none' }}>
                    <ListItem className='profile-sidebar-item'>
                        <RestorePageIcon />
                        <Typography className={`profile-item-text ${isSidebarOpen ? '' : 'profile-item-text-close'}`}>История проверок</Typography>
                    </ListItem>
                </NavLink>
                <NavLink to='favorites' style={{ color: '#000', textDecoration: 'none' }}>
                    <ListItem className='profile-sidebar-item'>
                        <FavoriteIcon />
                        <Typography className={`profile-item-text ${isSidebarOpen ? '' : 'profile-item-text-close'}`}>Избранное</Typography>
                    </ListItem>
                </NavLink>
                <NavLink to='ticket-system' style={{ color: '#000', textDecoration: 'none' }}>
                    <ListItem className='profile-sidebar-item'>
                        <ConfirmationNumberIcon />
                        <Typography className={`profile-item-text ${isSidebarOpen ? '' : 'profile-item-text-close'}`}>Тикетная система</Typography>
                    </ListItem>
                </NavLink>
                <NavLink to='settings' style={{ color: '#000', textDecoration: 'none' }}>
                    <ListItem className='profile-sidebar-item'>
                        <SettingsIcon />
                        <Typography className={`profile-item-text ${isSidebarOpen ? '' : 'profile-item-text-close'}`}>Настройки аккаунта</Typography>
                    </ListItem>
                </NavLink>
                <NavLink to='/' style={{ color: '#000', textDecoration: 'none' }}> 
                {/*TODO add scroll to #faq */}
                    <ListItem className='profile-sidebar-item'>
                        <QuestionMarkIcon />
                        <Typography className={`profile-item-text ${isSidebarOpen ? '' : 'profile-item-text-close'}`}>Вопросы и ответы</Typography>
                    </ListItem>
                </NavLink>
                <NavLink to='/forget-password' style={{ color: '#000', textDecoration: 'none' }}>
                    <ListItem className='profile-sidebar-item'>
                        <PasswordIcon />
                        <Typography className={`profile-item-text ${isSidebarOpen ? '' : 'profile-item-text-close'}`}>Сменить пароль</Typography>
                    </ListItem>
                </NavLink>
                <ListItem className='profile-sidebar-item' onClick={logoutUser}>
                    <LogoutIcon />
                    <Typography className={`profile-item-text ${isSidebarOpen ? '' : 'profile-item-text-close'}`}>Выйти</Typography>
                </ListItem>
            </List>
        </Box>
        <Box className='outlet-profile-container'>
            <Outlet>
            </Outlet>
        </Box>
    </Box>
  )

}

export default ProfileSidebar