import { Container, Box, Grid, Typography, TextField, Button } from "@mui/material"
import React, { useContext, useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import AuthContext from "../../../context/AuthContext"
import Loader from "../../../components/Loader/Loader"
import ChatForm from "../../../components/ChatForm/ChatForm"
import { validateTicketMessage } from "../../UserProfile/TicketSystem/TicketPage/ValidateTicketMessage"

import { createMessageAdmin } from "../../../api/Admin/tickets/createMessageAdmin"
import { getTicketDetailAdmin } from "../../../api/Admin/tickets/getTicketDetailAdmin"
import { closeTicketAdminRequest } from "../../../api/Admin/tickets/closeTicketAdminRequest"
import './TicketAnswerPage.css'


const AdminTicketAnswerPage = () => {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isSended, setIsSended] = useState(false)
    const {authTokens, user} = useContext(AuthContext)
    const [error, setError] = useState()
    const {id} = useParams()

    const BASE_URL_WITHOUT_PREFIX = process.env.REACT_APP_BASE_URL_WITHOUT_PREFIX

    useEffect(() => {
        getTicketDetailAdmin({id: id, setData: setData, isLoading: setIsLoading, token: authTokens.access})
    }, [id, authTokens])

    useEffect(() => {
        if (isSended) {
            window.location.reload(false)
        }
    }, [isSended])

    const handleMessageSubmit = ({text, files}) => {
        if (text || files) {
            if (validateTicketMessage({ selectedFiles: files, setError: setError })) {
                createMessageAdmin({ 
                    text: text, 
                    files: files,
                    ticket: id,
                    isSended: setIsSended,
                    token: authTokens.access,
                })
            }
        }
    }

    const handleTicketClose = () => {
        const confirmed = window.confirm("Вы уверены что хотите закрыть тикет ?");
        if (confirmed) {
            closeTicketAdminRequest({
                id: id,
                is_closed: true,
                token: authTokens.access
            })
            window.location.reload(false)
        }
    }

    const isImageFile = (filename) => {
        const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', '.bmp'];
        const ext = filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
        return imageExtensions.includes(ext.toLowerCase());
    };

    if (isLoading) {
        return(
            <Loader />
        )
    }
    return(
        <Container>
            <Grid container sx={{ marginTop: '25px' }}>
                <Grid item xs={12}>
                    {data?.ticket?.is_closed ? '' :
                        <Button 
                            className='close-ticket-btn'
                            onClick={handleTicketClose}
                        >
                            Закрыть тикет
                        </Button>
                    }
                    <Typography className='ticket-page-title'>
                        Тема запроса: {data?.ticket?.subject}
                    </Typography>
                </Grid>
                {data?.messages.map((message, index) => (
                    <Grid 
                        key={index}
                        item
                        xs={12}  
                        className={`ticket-message-box ${user?.id === message?.user ? 'user-ticket-container' : 'support-ticket-container'}`}
                    >
                        <Box className={`ticket-message-box ${user?.id === message?.user ? 'user-ticket' : 'support-ticket'}`}>
                            <Typography className='ticket-message-username'>
                                {message?.user_first_name} {message?.user_last_name}
                            </Typography>
                            <Typography className='ticket-message-text'>
                                {message.files.map((file, index) => (
                                    <React.Fragment key={index}>
                                        {isImageFile(file.file) ? (
                                            <Link to={`${BASE_URL_WITHOUT_PREFIX}${file.file}`} target='_blank'>
                                                <img 
                                                    src={`${BASE_URL_WITHOUT_PREFIX}${file.file}`} 
                                                    alt="Картинка"
                                                    className='ticket-message-img'
                                                />
                                            </Link>
                                        ) : (
                                            <a 
                                                href={`${BASE_URL_WITHOUT_PREFIX}${file.file}`} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                            >
                                                Ссылка на файл
                                            </a>
                                        )}
                                    </React.Fragment>
                                ))}
                                {message?.text}
                            </Typography>
                        </Box>
                    </Grid>
                ))}
            </Grid>
            <ChatForm handleMessageSubmit={handleMessageSubmit} />
        </Container>
    )
}

export default AdminTicketAnswerPage