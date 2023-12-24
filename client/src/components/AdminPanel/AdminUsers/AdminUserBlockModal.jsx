import { Modal, Box, TextField, Typography, Button, Select, MenuItem } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";
import { blockUser } from "../../../api/admin/users/blockUserRequest";
import AuthContext from "../../../context/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { validateText } from "../../../utils/FieldValidation";


const AdminUserBlockModal = ({ open, onClose, id}) => {
    const [block_reason, setBlockReason] = useState()
    const [block_duration, setBlockDuration] = useState({ hours: 0, days: 0 })
    const {authTokens} = useContext(AuthContext)
    const navigate = useNavigate()

    const handleBlockSubmit = () => {
        if (!block_reason || !block_duration.days) {
            alert("Пожалуйста, заполните все обязательные поля");
            return;
        }
        
        const confirmed = window.confirm("Вы уверены что хотите сохранить изменения ?");
        if (confirmed) {
            blockUser({
                id: id,
                block_reason: block_reason,
                block_duration_days: block_duration.days,
                token: authTokens.access,
            })
            onClose()
            navigate('/admin/users/')
        }
    }

    return (
        <Modal open={open} onClose={onClose}>
            <Box className="review-form-container" sx={{ display: 'flex', flexDirection: 'column' }}>
                <Box className='review-form-header'>
                    <Typography className='review-form-header-text'>Заблокировать пользователя</Typography>
                    <CloseIcon sx={{ fontSize: '26px', color: 'white' }} onClick={onClose} />
                </Box>

                <Box sx={{ padding: '30px' }}>
                    <TextField
                        fullWidth
                        className="review-text-field"
                        type='text'
                        onChange={(e) => setBlockReason(e.target.value)}
                        label="Причина блокировки" 
                    />
                    <Select
                        labelId="time-user-blocked"
                        value={block_duration.days || ''}
                        fullWidth
                        onChange={(e) => setBlockDuration({days: e.target.value})}
                        displayEmpty
                        sx={{ marginTop: '10px' }}
                    >
                        <MenuItem value="">Длительность блокировки</MenuItem>
                        <MenuItem value="1">24 часа</MenuItem>
                        <MenuItem value="7">7 дней</MenuItem>
                        <MenuItem value="24">24 дня</MenuItem>
                        <MenuItem value="30">30 дней</MenuItem>
                        <MenuItem value="60">60 дней</MenuItem>
                        <MenuItem value="9999">Навсегда</MenuItem>
                    </Select>

                    <Box className="review-form-button-container">
                        <Button 
                            sx={{    
                                background: '#DF4949',
                                color: 'white',
                                width: '100%',
                                margin: '10px auto',
                                height: '45px',
                                '&:hover': {
                                    background: '#DF4949',
                                    color: 'white'
                                }
                            }}
                            onClick={handleBlockSubmit}
                        >
                                Заблокировать
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Modal>
    )
}

export default AdminUserBlockModal