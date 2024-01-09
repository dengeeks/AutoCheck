import { Container, Box, Grid, Typography, TextField, Button } from "@mui/material"
import { useContext, useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import AuthContext from "../../../context/AuthContext"
import getTicketAndAnswerRequest from "../../../api/Admin/tickets/getTikcetAndAnswers"
import SendIcon from '@mui/icons-material/Send';
import Loader from "../../../components/Loader/Loader"
import { createTicketAnswer } from "../../../api/Admin/tickets/createTicketAnswerRequest"
import './TicketAnswerPage.css'


const AdminTicketAnswerPage = () => {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const {authTokens} = useContext(AuthContext)
    const [answer, setAnswer] = useState()
    const {id} = useParams()

    useEffect(() => {
        getTicketAndAnswerRequest({id: id, setData: setData, setIsLoading: setIsLoading, token: authTokens.access})
    }, [id, authTokens])

    const handleAnswerSubmit = () => {
        createTicketAnswer({ ticket_id: id, text: answer, token: authTokens.access })
        window.location.reload();
    }

    if (isLoading) {
        return(
            <Loader />
        )
    }
    return(
        <Container>
            <Grid container sx={{ marginTop: '25px' }}>
                <Grid item xs={12}>
                    <Typography className='ticket-page-title'>
                        Тема запроса: {data?.ticket?.subject}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Box className='ticket-message-box user-ticket'>
                        <Typography className='ticket-message-username' sx={{ textAlign: 'left' }}>
                            {data?.ticket?.user_first_name} {data?.ticket?.user_last_name}
                        </Typography>
                        <Typography className='ticket-message-text'>
                            {data?.ticket?.text}
                        </Typography>
                    </Box>
                </Grid>

                {data.answers.map((answer, index) => {
                    return(
                        <Grid key={index} item xs={12} sx={{ display: 'flex', justifyContent: 'right'}}>
                            <Box className='ticket-message-box support-ticket'>
                                <Typography className='ticket-message-username' sx={{ textAlign: 'right' }}>
                                    {answer?.user_first_name} {answer?.user_last_name}
                                </Typography>
                                <Typography className='ticket-message-text'>
                                    {answer?.text}
                                </Typography>
                            </Box>
                        </Grid>
                    )
                })}
            </Grid>           
            <Box className='ticket-response-form'>
                <TextField 
                    label='Ответить на тикет'                    
                    onChange={(e) => setAnswer(e.target.value)}
                    fullWidth
                />
                <Button 
                    className='admin-ticket-answer-btn'
                    onClick={() => handleAnswerSubmit()}
                >
                    <SendIcon />
                </Button>
            </Box>     
        </Container>
    )
}

export default AdminTicketAnswerPage