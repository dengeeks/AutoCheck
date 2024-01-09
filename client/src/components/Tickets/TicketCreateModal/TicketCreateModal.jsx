import { Modal, TextField, Box, Typography, Button } from "@mui/material"
import { createTicketRequest } from "../../../api/Admin/tickets/createTicketRequest"
import './TicketCreateModal.css'
import { useContext, useState } from "react"
import AuthContext from "../../../context/AuthContext"
import { validateTicketForm } from "./ValidateTicketForm"


const TicketCreateModal = ({ open, onClose }) => {
    const {authTokens} = useContext(AuthContext)
    const [error, setError] = useState({
        subject: '',
        text: ''
    })
    const [subject, setSubject] = useState('')
    const [text, setText] = useState('')

    const handleSubmitTicket = () => {
        if (validateTicketForm({subject: subject, text: text, setError: setError})) {
            createTicketRequest({
                subject: subject,
                text: text,
                token: authTokens.access
            })
            onClose()
            window.location.reload();
        }
    }

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
                        label='Тема'
                        className='ticket-form-field'
                        onChange={(e) => setSubject(e.target.value)}
                        error={!!error.subject}
                        helperText={error.subject}
                    />
                    <TextField
                        label='Сообщение'
                        rows={5}
                        multiline
                        onChange={(e) => setText(e.target.value)}
                        className='ticket-form-field'
                        error={!!error.subject}
                        helperText={error.text}
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