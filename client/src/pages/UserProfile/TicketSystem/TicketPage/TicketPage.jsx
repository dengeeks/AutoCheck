import { Box, Grid, Typography } from "@mui/material"
import { useParams } from "react-router-dom"
import './TicketPage.css'

const TicketPage = () => {
    const {id} = useParams()
    console.log(id, 'id')
    return(
        <Grid container sx={{ marginTop: '25px' }}>
            <Grid item xs={12}>
                <Typography className='ticket-page-title'>
                    Тема запроса: <br /> Не работает что то там где то там
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Box className='ticket-message-box user-ticket'>
                    <Typography className='ticket-message-username' sx={{ textAlign: 'left' }}>
                        Пользователь 123
                    </Typography>
                    <Typography className='ticket-message-text'>
                        Добрый день дело в том чтоуменятамчето там отвалилось можете Пожалуйста починить потому что оно не работает совсем
                    </Typography>
                </Box>
            </Grid>

            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'right'}}>
                <Box className='ticket-message-box support-ticket'>
                    <Typography className='ticket-message-username' sx={{ textAlign: 'right' }}>
                        Тех. поддержка
                    </Typography>
                    <Typography className='ticket-message-text'>
                        Привет!Благодарим Вас за то, что отправили нам ваше пожелание. Мы получаем много запросов каждый день, так что не в состоянии ответить всем. Но знайте, что мы просматриваем каждое предложение.
                    </Typography>
                </Box>
            </Grid>
        </Grid>
    )
}

export default TicketPage