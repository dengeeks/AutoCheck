import { Modal, Box, TextField, Typography, Button} from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";
import { createContact } from "../../../api/admin/contacts/createContactRequest";


const CreateContactModal = ({ open, onClose, token }) => {
    const [name, setName] = useState()
    const [info, setInfo] = useState()

    const handleContactSubmit = () => {
        const confirmed = window.confirm("Вы уверены что хотите сохранить изменения ?");
        if (confirmed) {
            createContact({
                name: name,
                info: info,
                token: token,
            })
            onClose()
        }
    }

    return (
        <Modal open={open} onClose={onClose}>
            <Box className="review-form-container" sx={{ display: 'flex', flexDirection: 'column' }}>
                <Box className='review-form-header'>
                    <Typography className='review-form-header-text'>Создать контакт</Typography>
                    <CloseIcon sx={{ fontSize: '26px', color: 'white' }} onClick={onClose} />
                </Box>

                <Box sx={{ padding: '30px' }}>
                    <TextField
                        fullWidth
                        className="review-text-field"
                        onChange={(e) => setName(e.target.value)}
                        label="Название" 
                    />
                    <TextField
                        fullWidth
                        sx={{ marginTop: '10px', marginBottom: '10px' }}
                        className="review-text-field"
                        onChange={(e) => setInfo(e.target.value)}
                        label="Информация" 
                    />

                    <Box className="review-form-button-container">
                        <Button 
                            sx={{    
                                background: '#498EDF',
                                color: 'white',
                                width: '100%',
                                margin: '10px auto',
                                height: '45px',
                                '&:hover': {
                                    background: '#498EDF',
                                    color: 'white'
                                }
                            }}
                            onClick={handleContactSubmit}
                        >
                                Создать контакт
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Modal>
    )
}

export default CreateContactModal