import { TextField, Box, Button } from "@mui/material"
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useState } from "react";

import { adminChangeUserPassword } from "../../../api/Admin/users/changePassword";


const GenerateUserPassword = ({ id, token }) => {
    const [password, setPassword] = useState('')

    const handleClickGeneratePassword = () => {
        const confirmed = window.confirm("Установить пользователю новый пароль ?");

        if (confirmed) {
            const length = 12;
            const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+[]{}|;:,.<>?';
            setPassword('')

            for (let i = 0; i < length; i++) {
                const randomIndex = Math.floor(Math.random() * charset.length);
                setPassword(prevPassword => prevPassword + charset[randomIndex]);
            }
            adminChangeUserPassword({id: id, password: password, token: token})
            navigator.clipboard.writeText(password)
        } else {
            setPassword('')
        }
    }
    return(
        <Box sx={{ display: 'inline-flex', marginTop: '5px' }}>
            <TextField 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                label='Пароль пользователя' 
                fullWidth
            />
            <Button 
                variant="contained"
                sx={{ background: '#498EDF' }}
                onClick={(e) => handleClickGeneratePassword()}
            >
                <ContentCopyIcon />
            </Button>
        </Box>
    )
}

export default GenerateUserPassword