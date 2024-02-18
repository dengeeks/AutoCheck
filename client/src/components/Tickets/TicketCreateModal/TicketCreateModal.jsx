import { Modal, TextField, Box, Typography, Button } from "@mui/material"
import './TicketCreateModal.css'
import { useContext, useState, useEffect } from "react"
import AuthContext from "../../../context/AuthContext"
import { validateTicketForm } from "./ValidateTicketForm"
import { createTicket } from "../../../api/Tickets/createTicket"
import { createTicketMessage } from "../../../api/Tickets/createTicketMessage"


const TicketCreateModal = ({ open, onClose }) => {
    const {authTokens} = useContext(AuthContext)
    const [error, setError] = useState({
        subject: '',
        message: '',
    })
    const [createdTicket, setCreatedTicket] = useState()
    const [files, setFiles] = useState([])
    const [subject, setSubject] = useState('')
    const [message, setMessage] = useState('')


    const handleSubmitTicket = () => {
        if (validateTicketForm({subject: subject, message: message, setError: setError})) {
            createTicket({
                subject: subject,
                createdTicket: setCreatedTicket,
                token: authTokens.access
            })
        }
    }

    useEffect(() => {
        if (createdTicket) {
            createTicketMessage({
                text: message,
                files: files,
                ticket: createdTicket.id,
                token: authTokens.access,
            })

            onClose()
            window.location.reload(false)
        }
    }, [createdTicket])

    return (
        <Modal open={open} onClose={onClose} className='ticket-modal-container'>
            <Box className='ticket-form-container'>
                <Box className='ticket-form-header'>
                    <Typography className='ticket-form-header-title'>
                        Создать запрос
                    </Typography>
                </Box>
                <Box className='ticket-form-fields'>
                    <TextField 
                        label='Тема обращения'
                        className='ticket-form-field'
                        onChange={(e) => setSubject(e.target.value)}
                        error={!!error.subject}
                        helperText={error.subject}
                    />
                    <TextField 
                        label='Сообщение'
                        className='ticket-form-field'
                        multiline
                        rows={6}
                        onChange={(e) => setMessage(e.target.value)}
                        error={!!error.message}
                        helperText={error.message}
                    />
                </Box>
                <Box className='ticket-form-btns'>
                    <Button 
                        className='submit-ticket-btn'
                        onClick={() => handleSubmitTicket()}
                    >
                        Отправить
                    </Button>
                </Box>
            </Box>
        </Modal>
    )
}

export default TicketCreateModal