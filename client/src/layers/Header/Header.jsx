import { Box, Typography, IconButton, Popover, List, ListItem, ListItemText } from "@mui/material"
import { useNavigate, Link } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import AuthContext from "../../context/AuthContext"
import LogoutIcon from '@mui/icons-material/Logout';
import HeaderReportForm from "../../components/HeaderReportForm/HeaderReportForm";
import MenuIcon from '@mui/icons-material/Menu';
import NotificationWebSocket from "../../api/WebSockets/NotificationWebSocket"
import { getWebsiteLogo } from "../../api/WebsiteLogo/getWebsiteLogo"
import './Header.css'


const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [websiteLogo, setWebsiteLogo] = useState()
  const {user, logoutUser} = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    getWebsiteLogo({setData: setWebsiteLogo,})
  }, [])

  const openMenu = (event) => {
    setIsMenuOpen(!isMenuOpen)
    setAnchorEl(event.currentTarget);
  }
  const closeMenu = () => {
    setIsMenuOpen(false)
    setAnchorEl(null);
  }

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
  
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate(`/`);
  
      setTimeout(() => {
        const homeSection = document.getElementById(id);
        if (homeSection) {
          homeSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
    closeMenu();
  };

  console.log(websiteLogo?.logo)
  return(
    <Box className='header-container'>
      {user ? 
      <NotificationWebSocket user_id={user?.id} />
      : ''}
      <Box 
        className='header-logo-container'
        onClick={() => navigate('/')}
      >
        <img src={websiteLogo?.logo} alt="logo" className='header-logo' />
      </Box>
      <Box className='header-report-form'>
        <HeaderReportForm />
      </Box>
      
      {/* Links for full size screen */}
      <Box className='header-link-container'> 
        <Box className='header-toolbar-links'>
          <Box 
            className='header-link-item'
            onClick={() => user ? navigate('/user-profile/tariff-plans') : scrollToSection('tariff-plans')}
          >
            <Typography className='header-link-text'>Тарифные планы</Typography>
          </Box>
          <Box 
            className='header-link-item'
            onClick={() => scrollToSection('reviews')}
          >
            <Typography className='header-link-text'>Отзывы</Typography>
          </Box>
          <Box 
            className='header-link-item'
            onClick={() => user ? navigate('/user-profile/faq') : scrollToSection('faq')}
          >
            <Typography className='header-link-text'>Ответы на вопросы</Typography>
          </Box>
          <Box 
            sx={{ marginRight: '30px' }} 
            className='header-link-item'
            onClick={() => user ? navigate('/user-profile/ticket-system') : navigate('/feedback')}
          >
            <Typography className='header-link-text'>Помощь</Typography>
          </Box>          
        </Box>

        {/* Menu with links for small screen */}
        <IconButton className='header-menu-btn' onClick={openMenu}>
          <MenuIcon />
        </IconButton>

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
              <ListItem button onClick={() => navigate('/faq')}>
                <ListItemText primary="Ответы на вопросы" />
              </ListItem>
              <ListItem button onClick={() => navigate('/feedback')}>
                <ListItemText primary="Помощь" />
              </ListItem>

              {!user &&
                <>
                  <ListItem button> 
                    <Link to='/registration' style={{textDecoration: 'none'}}>
                      <ListItemText sx={{ color: 'black', textDecoration: 'none' }} primary="Регистрация" />
                    </Link>
                  </ListItem>
                  <ListItem button>
                    <Link to='/login' style={{textDecoration: 'none'}}>
                      <ListItemText sx={{ color: 'black', }} primary="Авторизация" />
                    </Link> 
                  </ListItem>                 
                </>
              }
            </List>
        </Popover>
        {user ? 
          <Box sx={{ display: 'flex', justifyContent: 'row', alignItems: 'center', marginLeft: '20px' }}>
            <Box className='header-user-info' onClick={() => navigate('user-profile')}>
              <img 
                src={user.avatar} 
                alt="avatar"  
                className='header-user-avatar user-avatar-border'
              />
              <Typography className='header-user-name'>{user.first_name}</Typography>
            </Box>
            <LogoutIcon
              className='header-logout-logo'
              onClick={() => logoutUser()}
            />
          </Box>
        :     
          <>        
            <Box 
              className='header-link-item' 
              sx={{ marginLeft: '20px' }}
              onClick={() => navigate('/login')}
            >
              <Typography className='header-link-text'>Войти</Typography>
            </Box>
            <Box 
              className='header-link-item'
              onClick={() => navigate('/registration')}
            >
              <Typography className='header-link-text'>Регистрация</Typography>
            </Box>
          </>}
      </Box>
    </Box>
  )
}

export default Header