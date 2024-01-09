import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Box,
  AppBar, 
  Toolbar, 
  Typography, 
  IconButton, 
  Popover, 
  List, 
  ListItem,
  ListItemText,
  } from '@mui/material';
import Logo from '../../media/images/logo.png'
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import AuthContext from '../../context/AuthContext';
import HeaderReportForm from '../../components/HeaderReportForm/HeaderReportForm';
import getUserInfoRequest from '../../api/User/getUserInfoRequest';
import './Header.css'


const Header = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const {authTokens} = useContext(AuthContext)
  const {user, logoutUser} = useContext(AuthContext)
  const [userData, setUserData] = useState(null);

  console.log(userData)

  const openMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const storedUserData = localStorage.getItem('user_data');

    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    } else if (authTokens) {
      getUserInfoRequest({
        setData: (userData) => {
          setUserData(userData);

          // Обновляем информацию в localStorage после успешного запроса
          localStorage.setItem('user_data', JSON.stringify(userData));
        },
        token: authTokens.access,
      });
    }
  }, [authTokens]);


  useEffect(() => {
    if (user?.is_blocked) {
      navigate('/you-blocked/')
    }
  }, [user, navigate])

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate(`/`);
    }
    // Закрываем меню после выбора пункта
    closeMenu();
  };

  const isMenuOpen = Boolean(anchorEl);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ background: '#498EDF', marginBottom: '25px !important'}}>
        <Toolbar>
          <Typography component="div" sx={{ flexGrow: 1 }}>
            <Link to='/'> 
              <img src={Logo} alt="" style={{ width: '170px' }} />
            </Link>
          </Typography>
          {/* IconButton для открытия меню на мобильных устройствах */}
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={openMenu}
            sx={{ display: { xs: 'block', md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Box className='report-form-header'>
            <HeaderReportForm />
          </Box>
          {/* Ссылки для десктопной версии */}
          <Typography onClick={() => scrollToSection('tariff-plans')} className="header-link" sx={{ display: { xs: 'none', md: 'block' } }}>
            Тарифные планы
          </Typography>
          <Typography onClick={() => scrollToSection('reviews')} className="header-link" sx={{ display: { xs: 'none', md: 'block' } }}>
            Отзывы
          </Typography>

          {/* Popover для мобильной версии */}
          <Popover
            open={isMenuOpen}
            anchorEl={anchorEl}
            onClose={closeMenu}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <List>
              <ListItem button onClick={() => scrollToSection('tariff-plans')}>
                <ListItemText primary="Тарифные планы" />
              </ListItem>
              <ListItem button onClick={() => scrollToSection('reviews')}>
                <ListItemText primary="Отзывы" />
              </ListItem>

              <ListItem button onClick={() => scrollToSection('reviews')}> 
                <Link to='/registration' style={{textDecoration: 'none'}}>
                  <ListItemText sx={{ color: 'black', textDecoration: 'none' }} primary="Регистрация" />
                </Link>
              </ListItem>

              <ListItem button onClick={() => scrollToSection('reviews')}>
                <Link to='/login' style={{textDecoration: 'none'}}>
                  <ListItemText sx={{ color: 'black', }} primary="Авторизация" />
                </Link> 
              </ListItem>
            </List>
          </Popover>

          {/* Ссылки для десктопной версии */}
          {user ?
            <>
              <Link to='/user-profile' style={{textDecoration: 'none'}}>
                <Typography className="header-link">
                  {userData?.first_name} {userData?.last_name}
                </Typography>
              </Link>

              <LogoutIcon onClick={logoutUser} />
            </>
          :
            <>
              <Link to="/registration" style={{ textDecoration: 'none', color: '#fff' }}>
                <Typography className="header-link" sx={{ display: { xs: 'none', md: 'block' } }}>
                  Регистрация
                </Typography>
              </Link>

              <Link to="/login" style={{ textDecoration: 'none', color: '#fff' }}>
                <Typography className="header-link" sx={{ display: { xs: 'none', md: 'block' } }}>
                  Войти
                </Typography>
              </Link>
            </>
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
