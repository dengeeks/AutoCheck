import {useState, useEffect} from 'react';
import { Box, Typography, Container, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { getWebsiteLogo } from '../../api/WebsiteLogo/getWebsiteLogo';
import './Footer.css';

import { getAdminContacts } from '../../api/Admin/contacts/getContactsRequest';


const Footer = () => {
  const [contacts, setContacts] = useState([])
  const [websiteLogo, setWebsiteLogo] = useState()

  console.log(websiteLogo, 'logo')
  useEffect(() => {
    getWebsiteLogo({setData: setWebsiteLogo,})
    getAdminContacts({setData: setContacts})
  }, [])
  
  return (
    <Box className="footer-root">
    <Container sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Box className="footer-column">
        <Box className="footer-logo">
          <img src={websiteLogo?.logo} alt="Логотип сайта" className='footer-logo-img' />
        </Box>
        <Box className="footer-contacts">
            <Typography className='contact-footer-info'>Отдел клиентского сервиса</Typography>
            <Typography className='contact-footer-info'>работает: <br /> с 07:00 до 24:00 по МСК</Typography>
            {contacts.map((contact) => {
              return(
                <Typography className='contact-footer-info' key={contact.id}>{contact.name}: {contact.info}</Typography>
              )
            })}
            <Link to='/feedback'>
                <Button className='contact-footer-btn'>Задать вопрос</Button>
            </Link>    
        </Box>
      </Box>
      <Box className="footer-column">
         <Typography className='footer-title'>Разделы:</Typography>
         <Link style={{ textDecoration: 'none', color: '#fff' }} to='/'>
          <Typography className='contact-footer-info'>Главная</Typography>
         </Link>
         <Link style={{ textDecoration: 'none', color: '#fff' }} to='/user-profile'>
          <Typography className='contact-footer-info'>Личный кабинет</Typography>
         </Link>
         <Link style={{ textDecoration: 'none', color: '#fff' }} to='/feedback'>
          <Typography className='contact-footer-info'>Обратная связь</Typography>
         </Link>
         <Link style={{ textDecoration: 'none', color: '#fff' }} to='/user-profile/tariff-plans'>
          <Typography className='contact-footer-info'>Тарифные планы</Typography>
         </Link>
      </Box>
      <Box className="footer-column second-footer-column">
         <Typography className='footer-title'>Навигация:</Typography>
         <Link style={{ textDecoration: 'none', color: '#fff' }} to='/registration'>
          <Typography className='contact-footer-info'>Регистрация</Typography>
         </Link>
         <Link style={{ textDecoration: 'none', color: '#fff' }} to='/login'>
          <Typography className='contact-footer-info'>Авторизация</Typography>
         </Link>
         <Link style={{ textDecoration: 'none', color: '#fff' }} to='/forget-password'>
          <Typography className='contact-footer-info'>Восстановление пароля</Typography>
         </Link>
      </Box>
    </Container>     
    <Box className="under-footer-info">
        © 2023 Avtorevizorbot.
    </Box>
    </Box>
  );
};

export default Footer;
