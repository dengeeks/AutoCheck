import {Typography, AppBar, Toolbar, Box} from '@mui/material';
import './Header.css'


const Header = () => {
    return(
    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static" sx={{ background: '#498EDF', }}>
      <Toolbar>
        <Typography component="div" sx={{ flexGrow: 1 }}>
          LOGO
        </Typography>
        <Typography className='header-link'>
          Тарифные планы
        </Typography>
        <Typography className='header-link'>
          Информация
        </Typography>
        <Typography className='header-link'>
          Информация
        </Typography>
        <Typography className='header-link'>
          Информация
        </Typography>
      </Toolbar>
    </AppBar>
  </Box>
    )
}

export default Header