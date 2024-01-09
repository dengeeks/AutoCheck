import CustomTextField from "../../../components/CustomTextField/CustomTextField"
import { Container, Box, Button, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import './ProfileIndex.css'


const Profile = () => {
    return (
        <Container>
            <Box className='profile-title-container'>
                <Typography className='profile-title'>
                    Ваш личный кабинет
                </Typography>
            </Box>
            <Box className='profile-report-input-container'>
                <CustomTextField />
            </Box>
            <Box className='profile-btns-container'>
                <Link to='/'>
                    <Button className='profile-navigate-btn'>Заказать отчет</Button>
                </Link>
                <Link to='/user-profile/balance'>
                    <Button className='profile-navigate-btn'>Пополнить баланс</Button>
                </Link>
                <Link to='/'>
                    <Button className='profile-navigate-btn'>Перейти к тарифам</Button>
                </Link>
            </Box>
            <Box>
                {/* История проверок */}
            </Box>
        </Container>
    )
}

export default Profile