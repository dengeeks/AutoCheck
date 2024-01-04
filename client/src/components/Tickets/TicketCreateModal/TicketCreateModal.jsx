import { Modal, TextField, Box, Typography, Button } from "@mui/material"
import './TicketCreateModal.css'

const TicketCreateModal = ({ open, onClose, setData }) => {
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
                    />
                    <TextField
                        label='Сообщение'
                        rows={5}
                        multiline
                        className='ticket-form-field'
                    />
                </Box>
                <Box className='ticket-form-btns'>
                    <Button className='submit-ticket-btn'>Отправить</Button>
                </Box>
            </Box>
        </Modal>
    )
}

export default TicketCreateModal