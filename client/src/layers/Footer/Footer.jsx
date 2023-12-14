import React from 'react';
import { Box, Typography, Container, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import './Footer.css';


const Footer = () => {
  return (
    <Box className="footer-root">
    <Container sx={{ display: 'flex', justifyContent: 'space-between', }}>
      <Box className="footer-column">
        <Box className="footer-logo">Your Logo</Box>
        <Box className="footer-contacts">
            <Typography className='contact-footer-info'>Отдел клиентского сервиса</Typography>
            <Typography className='contact-footer-info'>работает: <br /> с 07:00 до 24:00 по МСК</Typography>
            <Typography className='contact-footer-info'>E-mail тех. поддержки: <br /> support@aistsoft.tech</Typography>
            <Typography className='contact-footer-info'>Для Москвы: <br /> +7 (495) 055-86-18</Typography>
            <Typography className='contact-footer-info'>Для регионов: <br /> 8 (800) 350-88-05</Typography>
            <Link to='/feedback'>
                <Button className='contact-footer-btn'>Задать вопрос</Button>
            </Link>    
        </Box>
      </Box>
      <Box className="footer-column">
         <Typography className='footer-title'>Следующий отдел</Typography>
         <Typography className='contact-footer-info'>Информация</Typography>
         <Typography className='contact-footer-info'>Информация</Typography>
         <Typography className='contact-footer-info'>Информация</Typography>
         <Typography className='contact-footer-info'>Информация</Typography>
      </Box>
      <Box className="footer-column">
         <Typography className='footer-title'>Следующий отдел</Typography>
         <Typography className='contact-footer-info'>Информация</Typography>
         <Typography className='contact-footer-info'>Информация</Typography>
         <Typography className='contact-footer-info'>Информация</Typography>
         <Typography className='contact-footer-info'>Информация</Typography>
      </Box>
    </Container>     
    <Box className="under-footer-info">
        © 2023 Your Company. All rights reserved.
      </Box>
    </Box>
  );
};

export default Footer;
