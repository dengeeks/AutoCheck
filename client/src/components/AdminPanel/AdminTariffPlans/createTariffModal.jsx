import { Modal, Box, TextField, Typography, Button, Select, MenuItem } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";

import { createTariffPlan } from "../../../api/Admin/tariff/createTariffPlanRequest";


const CreateTariffPlanModal = ({ open, onClose, token }) => {
    const [name, setName] = useState()
    const [color, setColor] = useState()
    const [price, setPrice] = useState()
    const [request_quantity, setRequestQuantity] = useState()

    const handleTariffSubmit = () => {
        const confirmed = window.confirm("Вы уверены что хотите сохранить изменения ?");
        if (confirmed) {
            createTariffPlan({
                name: name,
                price: price,
                color: color,
                request_quantity: request_quantity,
                token: token,
            })
            onClose()
            window.location.reload();
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
                        label="Название тарифа" 
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
                    <Select
                        labelId="color-selector-label"
                        value={color || ''}
                        fullWidth
                        onChange={(e) => setColor(e.target.value)}
                        displayEmpty
                        sx={{ marginTop: '10px' }}
                    >
                        <MenuItem value="" disabled>Выберите цвет</MenuItem>
                        <MenuItem value="red">Красный</MenuItem>
                        <MenuItem value="orange">Оранжевый</MenuItem>
                        <MenuItem value="yellow">Желтый</MenuItem>
                        <MenuItem value="blue">Синий</MenuItem>
                        <MenuItem value="green">Зелёный</MenuItem>
                    </Select>

                    {price && request_quantity ? <Typography sx={{ textAlign: 'center', marginTop: '5px' }}>Цена одного отчёта {price / request_quantity}</Typography> : ''}
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