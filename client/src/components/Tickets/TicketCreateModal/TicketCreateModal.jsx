import { Modal, TextField, Box, Typography, Button } from "@mui/material"
import './TicketCreateModal.css'
import { useContext, useState } from "react"
import AuthContext from "../../../context/AuthContext"
import { validateTicketForm } from "./ValidateTicketForm"
import { createTicket } from "../../../api/Tickets/createTicket"


const TicketCreateModal = ({ open, onClose }) => {
    const {authTokens} = useContext(AuthContext)
    const [error, setError] = useState({
        subject: '',
    })
    const [subject, setSubject] = useState('')

    const handleSubmitTicket = () => {
        if (validateTicketForm({subject: subject, setError: setError})) {
            createTicket({
                subject: subject,
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
                        label='Тема обращения'
                        className='ticket-form-field'
                        onChange={(e) => setSubject(e.target.value)}
                        error={!!error.subject}
                        helperText={error.subject}
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