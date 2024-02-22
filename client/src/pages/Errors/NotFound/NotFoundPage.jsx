import NotFoundGif from '../../../media/video/404-NotFound.gif'
import { Box, Typography, Button } from '@mui/material'
import './NotFound.css'
import { useNavigate } from 'react-router-dom'
import useDocumentTitle from '../../../utils/useDocumentTitle'

const NotFoundError = () => {
    const navigate = useNavigate()
    useDocumentTitle('Страница не найдена')
    const NavigateToMainPage = () => {
        navigate('/')
    }
    return(
        <Box className='not-found-container' sx={{ width: '100%', textAlign: 'center' }}>
            <Typography className='not-found-title'>Страница не найдена</Typography>
            <img src={NotFoundGif} alt="Not Found" className='not-found-gif' />
            <Box className=''>
                <Button className='not-found-btn' onClick={NavigateToMainPage}>На главную</Button>
            </Box>
        </Box>
    )
}

export default NotFoundError