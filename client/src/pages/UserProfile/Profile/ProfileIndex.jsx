import { Container, Box, Button, Typography, TextField, IconButton } from "@mui/material"
import { useState } from "react";
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import SearchIcon from '@mui/icons-material/Search';
import HelpModal from "../../../components/HelpModal/HelpModal";
import { Link, useNavigate } from "react-router-dom"
import './ProfileIndex.css'


const Profile = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const navigate = useNavigate()
    
    const closeModal = () => {
        setIsModalOpen(false)
    }

    return (
        <Container>
            <HelpModal open={isModalOpen} onClose={closeModal} />
            <Box className='profile-title-container'>
                <Typography className='profile-title'>
                    Ваш личный кабинет
                </Typography>
            </Box>
            <Box className='profile-request-form'>
                <TextField 
                    sx={{ width: '70%' }}
                    label='VIN или госномер'
                    InputProps={{
                        endAdornment: (
                          <IconButton onClick={() => setIsModalOpen(true)}>
                            <HelpOutlineOutlinedIcon />
                          </IconButton>
                        ),
                    }}
                />
                <Button
                    className='profile-submit-request-btn'
                    endIcon={<SearchIcon />}
                >
                    Поиск
                </Button>                    
            </Box>
            <Box className='profile-btns-container'>
                <Button 
                    className='profile-navigate-btn' 
                    onClick={() => navigate('/')}
                >
                    Заказать отчет
                </Button>
                <Button 
                    className='profile-navigate-btn'
                    onClick={() => navigate('/user-profile/balance')}
                >
                    Пополнить баланс
                </Button>
                <Button 
                    className='profile-navigate-btn'
                    onClick={() => navigate('/user-profile/tariff-plans')}
                >
                    Перейти к тарифам
                </Button>
            </Box>
            <Box>
                {/* История проверок */}
            </Box>
        </Container>
    )
}

export default Profile