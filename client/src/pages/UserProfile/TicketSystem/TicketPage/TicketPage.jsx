import { Box, Grid, Typography } from "@mui/material"
import { useParams } from "react-router-dom"
import getTicketAndAnswerRequest from "../../../../api/Admin/tickets/getTikcetAndAnswers"
import { useState, useEffect, useContext } from "react"
import AuthContext from "../../../../context/AuthContext"
import './TicketPage.css'
import { passFilterLogic } from "@mui/x-data-grid/internals"
import Loader from "../../../../components/Loader/Loader"

const TicketPage = () => {
    const {id} = useParams()
    const {authTokens} = useContext(AuthContext)
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getTicketAndAnswerRequest({id: id, setData: setData, setIsLoading: setIsLoading, token: authTokens.access})
    }, [id, authTokens])

    if (isLoading) {
        return(
            <Loader />
        )
    }
    return(
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
            {data.answers.map((answer, index) => (
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
            ))}
        </Grid>
    )
}

export default TicketPage