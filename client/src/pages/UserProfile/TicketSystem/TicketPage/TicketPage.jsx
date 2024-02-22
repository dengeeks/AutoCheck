import { Box, Grid, Typography, TextField, Button } from "@mui/material"
import { Link, useParams } from "react-router-dom"
import React, { useState, useEffect, useContext } from "react"
import AuthContext from "../../../../context/AuthContext"
import './TicketPage.css'
import Loader from "../../../../components/Loader/Loader"
import ChatForm from "../../../../components/ChatForm/ChatForm"
import { validateTicketMessage } from "./ValidateTicketMessage"
import { createTicketMessage } from "../../../../api/Tickets/createTicketMessage"
import { getTicketDetail } from "../../../../api/Tickets/getTicketDetail"
import { closeTicketRequest } from "../../../../api/Tickets/closeTicketRequest"
import { resetTicketUnreadMessages } from "../../../../api/Tickets/resetTicketUnreadMessages"
import useDocumentTitle from "../../../../utils/useDocumentTitle"


const TicketPage = () => {
    const {id} = useParams()
    const {authTokens, user} = useContext(AuthContext)
    const [data, setData] = useState([])
    const [error, setError] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const [isSended, setIsSended] = useState(false)
    useDocumentTitle('Тикет')
    const fileTypes = {
        mp3: 'Аудио',
        mp4: 'Видео',
        pdf: 'PDF',
        doc: 'Документ (doc)',
        docx: 'Документ (docx)',
        jpg: 'Изображение (jpg)',
        jpeg: 'Изображение (jpeg)',
        png: 'Изображение (png)',
        gif: 'Изображение (gif)'
    };
    const BASE_URL_WITHOUT_PREFIX = process.env.REACT_APP_BASE_URL_WITHOUT_PREFIX

    useEffect(() => {
        getTicketDetail({id: id, setData: setData, isLoading: setIsLoading, token: authTokens.access})
        resetTicketUnreadMessages({ id: id, token: authTokens.access })
    }, [id, authTokens])

     useEffect(() => {
        if (isSended) {
            window.location.reload(false)
        }
    }, [isSended])

    if (isLoading) {
        return(
            <Loader />
        )
    }

    const isImageFile = (filename) => {
        const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', '.bmp']; // Добавьте нужные расширения
        const ext = filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
        return imageExtensions.includes(ext.toLowerCase());
    };

    const handleMessageSubmit = ({text, files}) => {
        if (text || files) {
            if (validateTicketMessage({ selectedFiles: files, setError: setError })) {
                createTicketMessage({
                    text: text,
                    files: files,
                    ticket: id,
                    token: authTokens.access,
                    isSended: setIsSended
                })
            }            
        }
    }

    const handleTicketClose = () => {
        const confirmed = window.confirm("Вы уверены что хотите закрыть тикет ?");
        if (confirmed) {
            closeTicketRequest({
                id: id,
                is_closed: true,
                token: authTokens.access
            })
            window.location.reload(false)
        }
    }

    return(
        <Grid container sx={{ marginTop: '25px' }}>
            {data?.ticket?.is_closed ? '' : 
                <Button 
                    className='close-ticket-btn'
                    onClick={handleTicketClose}
                >
                    Закрыть тикет
                </Button>
            }
            <Grid item xs={12}>
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
                                    <Box>
                                        <Typography className='file-type-ticket'>
                                            Тип файла: {fileTypes[file.file.split('.').pop().toLowerCase()]}
                                        </Typography>
                                        <a 
                                            href={`${BASE_URL_WITHOUT_PREFIX}${file.file}`} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
                                        >
                                            Загрузить файл
                                        </a>                                        
                                    </Box>

                                )}
                            </React.Fragment>
                        ))}
                        {message?.text}
                        </Typography>
                    </Box>
                </Grid>
            ))}

            {data.ticket.is_closed ? 
                <Grid 
                    item
                    xs={12}
                    sx={{ marginBottom: '20px' }}
                    className='support-ticket-container'
                >
                    <Box className='ticket-message-box support-ticket'>
                        <Typography className='ticket-message-username'>Системное уведомление</Typography>
                        <Typography className='ticket-message-text'>
                            Текущий тикет закрыт!<br/>
                            Если у вас остались вопросы либо проблема не решена - то создайте новый тикет!
                        </Typography>
                    </Box>
                </Grid>
            : ''}
            <Grid item xs={12}>
                {data?.ticket?.is_closed ? '' : 
                    <ChatForm id={id} handleMessageSubmit={handleMessageSubmit} />
                }
            </Grid>
        </Grid>
    )
}

export default TicketPage