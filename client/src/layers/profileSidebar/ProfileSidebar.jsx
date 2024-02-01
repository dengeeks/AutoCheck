import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, NavLink, Outlet, Link } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import { Box, List, ListItem, Typography, Tooltip } from '@mui/material';

import Diversity3Icon from '@mui/icons-material/Diversity3';
import RestoreIcon from '@mui/icons-material/Restore';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LogoutIcon from '@mui/icons-material/Logout';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import SettingsIcon from '@mui/icons-material/Settings';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import './ProfileSidebar.css';


const ProfileSidebar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(
        localStorage.getItem('isSidebarOpen') === 'true' || false
      );
    const {user, logoutUser} = useContext(AuthContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (!user) {
            navigate('/login')
        }
    }, [user, navigate])

    useEffect(() => {
        localStorage.setItem('isSidebarOpen', isSidebarOpen);
      }, [isSidebarOpen]);

    const handleNavbarOpen = () => {
        setIsSidebarOpen(true)
    }

    const handleNavbarClose = () => {
        setIsSidebarOpen(false)
    }
    console.log(user, 'REQ QUANTITY')

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
                    <Box 
                        className={`${isSidebarOpen ? 'profile-sidebar-header': 'profile-sidebar-header-closed'}`} 
                        sx={{ display: 'flex', flexDirection: 'row' }}
                    >
                        <Link to='/user-profile'>                        
                            <img 
                                src={user?.avatar} 
                                alt="Аватарка" 
                                className={`user-avatar-border ${isSidebarOpen ? 'profile-user-avatar' : 'profile-user-avatar-closed'}`} 
                            />
                        </Link>
                        {isSidebarOpen && (
                            <Box>
                                <Typography className='profile-user-account'>Баланс: <span className='profile-user-account-price'>{user?.balance}₽</span></Typography>
                                <Tooltip title={`${user?.first_name} ${user?.last_name}`}>
                                    <Typography className='profile-sidebar-username'>{user?.first_name} {user?.last_name}</Typography>
                                </Tooltip>
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
                                Тарифный план: <Link to='/user-profile/tariff-plans'><span className='profile-user-request-quantity'>Выбрать</span></Link>
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
                <NavLink to='referral-system' style={{ color: '#000', textDecoration: 'none' }}>
                    <ListItem className='profile-sidebar-item'>
                        <Diversity3Icon />
                        <Typography className={`profile-item-text ${isSidebarOpen ? '' : 'profile-item-text-close'}`}>Реферальная система</Typography>
                    </ListItem>
                </NavLink>
                <NavLink to='inspection-history' style={{ color: '#000', textDecoration: 'none' }}>
                    <ListItem className='profile-sidebar-item'>
                        <RestoreIcon />
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
                <NavLink to='/user-profile/faq' style={{ color: '#000', textDecoration: 'none' }}> 
                    <ListItem className='profile-sidebar-item'>
                        <QuestionMarkIcon />
                        <Typography className={`profile-item-text ${isSidebarOpen ? '' : 'profile-item-text-close'}`}>Вопросы и ответы</Typography>
                    </ListItem>
                </NavLink>
                <ListItem className='profile-sidebar-item' onClick={logoutUser}>
                    <LogoutIcon />
                    <Typography className={`profile-item-text ${isSidebarOpen ? '' : 'profile-item-text-close'}`}>Выйти</Typography>
                </ListItem>
            </List>
        </Box>
        <Box className='outlet-profile-container'>
            <Outlet />
        </Box>
    </Box>
  )

}

export default ProfileSidebar