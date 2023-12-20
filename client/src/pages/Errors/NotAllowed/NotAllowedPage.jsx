import { Box, Typography, Button } from "@mui/material"
import NotAllowedImg from '../../../media/images/NotAllowed.jpg'
import { useNavigate } from "react-router-dom"
import './NotAllowed.css'

const NotAllowedPage = () => {
    const navigate = useNavigate()

    const navigateToFeedbackPage = () => {
        navigate('/feedback')
    }

    const navigateToMainPage = () => {
        navigate('/')
    }
    return(
        <Box className='not-allowed-container'>
            <img src={NotAllowedImg} alt="Доступ ограничен" className='not-allowed-img' />
            <Typography className='not-allowed-title'>ОШИБКА ДОСТУПА</Typography>
            <Typography className='not-allowed-text'>
                У вас недостаточно прав для посещения этой страницы.Рекомендуем вам вернуться на главную страницу, а также сообщить об ошибке "тех. поддержке".
            </Typography>
            
            <Box>
                <Button className='not-allowed-btn' onClick={navigateToFeedbackPage}>Тех. Поддержка</Button>
                <Button className='not-allowed-btn' onClick={navigateToMainPage}>На главную</Button>
            </Box>
        </Box>
    )
}

export default NotAllowedPage