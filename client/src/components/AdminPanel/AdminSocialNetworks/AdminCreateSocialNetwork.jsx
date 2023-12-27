import { Modal, Box, TextField, Typography, Button, Select, MenuItem} from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import { useState, useRef } from "react";
import { createSocialNetwork } from "../../../api/admin/socialNetworks/createSocialNetworkRequest";
import UploadFileIcon from '@mui/icons-material/UploadFile';


const CreateSocialNetworkModal = ({ open, onClose, token }) => {
    const fileInputRef = useRef(null);
    const [social_network, setSocialNetwork] = useState()
    const [link, setLink] = useState()
    const [qr_code, setQrCode] = useState()

    const handleAttachFileClick = () => {
        fileInputRef.current.click();
    };

    const handleSocialNetworkSubmit = () => {
        console.log(social_network, link, qr_code)
        const confirmed = window.confirm("Вы уверены что хотите сохранить изменения ?");
        if (confirmed) {
            createSocialNetwork({
                social_network: social_network,
                link: link,
                qr_code: qr_code,
                token: token,
            })
            onClose()
            window.location.reload();
        }
    }

    const handleFileChange = (e) => {
        // Обновляем qrCode с объектом File
        const file = e.target.files[0];
        setQrCode(file);
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box className="review-form-container" sx={{ display: 'flex', flexDirection: 'column' }}>
                <Box className='review-form-header'>
                    <Typography className='review-form-header-text'>Добавить соц. сеть</Typography>
                    <CloseIcon sx={{ fontSize: '26px', color: 'white' }} onClick={onClose} />
                </Box>

                <Box sx={{ padding: '30px' }}>
                    <Select
                        labelId="color-selector-label"
                        value={social_network || ''}
                        fullWidth
                        onChange={(e) => setSocialNetwork(e.target.value)}
                        displayEmpty
                        sx={{ marginTop: '10px' }}
                    >
                        <MenuItem value="" disabled>Выберите соц. сеть</MenuItem>
                        <MenuItem value="youtube">Youtube</MenuItem>
                        <MenuItem  value="instagram">Instagram</MenuItem>
                        <MenuItem value="telegram">Telegram</MenuItem>
                        <MenuItem value="facebook">Facebook</MenuItem>
                        <MenuItem value="whatsapp">WhatsApp</MenuItem>
                        <MenuItem value="viber">Viber</MenuItem>
                        <MenuItem value="vk">Vk</MenuItem>
                    </Select>
                    <TextField
                        fullWidth
                        sx={{ marginTop: '10px', marginBottom: '10px' }}
                        className="review-text-field"
                        onChange={(e) => setLink(e.target.value)}
                        label="Ссылка" 
                    />
                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                        accept=".jpg, .jpeg, .png"
                        multiple
                    />
                    
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Button className='feedback-file-button' onClick={handleAttachFileClick} startIcon={<UploadFileIcon />} >Добавить</Button>
                        <Typography>{qr_code?.name}</Typography> 
                    </Box>
                    
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
                            onClick={handleSocialNetworkSubmit}
                        >
                            Добавить соц. сеть
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Modal>
    )
}

export default CreateSocialNetworkModal