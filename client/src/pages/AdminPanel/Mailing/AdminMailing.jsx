import { Box, TextField, Button, Select, MenuItem, Typography } from "@mui/material"
import { useState, useContext } from "react"
import { sendMailing } from "../../../api/admin/mailing/sendMailingRequest"
import './AdminMailing.css'
import AuthContext from "../../../context/AuthContext"


const AdminMailingPage = () => {
    const {authTokens} = useContext(AuthContext)
    const [mailingType, setMailingType] = useState('') 
    const [subject, setSubject] = useState('') 
    const [userID, setUserID] = useState(0)
    const [message, setMessage] = useState('')


    const handleMailingSubmit = () => {
        const confirmed = window.confirm("Вы уверены что хотите сохранить изменения ?");
        if (confirmed) {
            sendMailing({ subject: subject, message: message, user_id: userID, token: authTokens.access })
            console.log(mailingType, message, userID)
        }
    }

    return(
        <Box sx={{
            width: '500px',
            margin: '0 auto',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            height: '85vh',
          }}
        >
            <Typography className='mailing-title'>Управление рассылкой</Typography>
            <TextField 
                fullWidth
                label='Тема сообщения'
                onChange={(e) => setSubject(e.target.value)}
                sx={{ marginBottom: '10px' }}
            />
            <TextField 
                rows={8}
                multiline
                fullWidth
                label='Текст'
                onChange={(e) => setMessage(e.target.value)}
                sx={{ marginBottom: '10px' }}
            />
            {mailingType === "user_id" && (
                <TextField 
                    fullWidth
                    label="ID пользователя"
                    onChange={(e) => setUserID(e.target.value)}
                    type='number'
                    sx={{ marginBottom: '10px' }}
                />
            )}
            <Select
                labelId="color-selector-label"
                value={mailingType || ''}
                onChange={(e) => setMailingType(e.target.value)}
                fullWidth
                displayEmpty
                sx={{ marginBottom: '10px' }}
            >
                <MenuItem value="" disabled>Выберите тип рассылки</MenuItem>
                <MenuItem value="all">Всем</MenuItem>
                <MenuItem value="active">Активным</MenuItem>
                <MenuItem value="inactive">Не активным</MenuItem>
                <MenuItem value="user_id">Точечная</MenuItem>
            </Select>
            <Button 
                className='mailing-submit-btn'
                variant='contained'
                fullWidth
                onClick={() => handleMailingSubmit()}
            >
                Отправить
            </Button>
        </Box>
    )
}

export default AdminMailingPage