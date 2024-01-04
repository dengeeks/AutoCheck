import CustomTextField from "../../../components/CustomTextField/CustomTextField"
import { Container, Box, Button } from "@mui/material"
import { Link } from "react-router-dom"
import './ProfileIndex.css'


const Profile = () => {
    return (
        <Container sx={{ marginTop: '105px' }}>
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