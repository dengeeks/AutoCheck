import { Modal, Box, TextField, Typography, Button} from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";
import { createTariffPlan } from "../../../../api/admin/tariff/createTariffPlanRequest";


const CreateContactModal = ({ open, onClose, token }) => {
    const [social_network, setSocialNetwork] = useState()
    const [link, setLink] = useState()
    const [qr_code, setQrCode] = useState()

    const handleContactSubmit = () => {
        const confirmed = window.confirm("Вы уверены что хотите сохранить изменения ?");
        if (confirmed) {
            createTariffPlan({
                name: name,
                price: price,
                request_quantity: request_quantity,
                token: token,
            })
            onClose()
        }
    }

    return (
        <Modal open={open} onClose={onClose}>
            <Box className="review-form-container" sx={{ display: 'flex', flexDirection: 'column' }}>
                <Box className='review-form-header'>
                    <Typography className='review-form-header-text'>Создать тариф</Typography>
                    <CloseIcon sx={{ fontSize: '26px', color: 'white' }} onClick={onClose} />
                </Box>

                <Box sx={{ padding: '30px' }}>
                    <TextField
                        fullWidth
                        className="review-text-field"
                        onChange={(e) => setName(e.target.value)}
                        label="Назввание тарифа" 
                    />
                    <TextField
                        fullWidth
                        sx={{ marginTop: '10px', marginBottom: '10px' }}
                        className="review-text-field"
                        type='number'
                        onChange={(e) => setPrice(e.target.value)}
                        label="Цена тарифа" 
                    />
                    <TextField
                        fullWidth
                        className="review-text-field"
                        type='number'
                        onChange={(e) => setRequestQuantity(e.target.value)}
                        label="Количество запросов" 
                    />
                    
                    <Box className="review-form-button-container">
                        <Button 
                            sx={{ background: '#498EDF', color: 'white', width: '100%', margin: '10px auto', height: '45px' }} 
                            onClick={handleTariffSubmit}
                        >
                                Создать тариф
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Modal>
    )
}

export default CreateTariffPlanModal