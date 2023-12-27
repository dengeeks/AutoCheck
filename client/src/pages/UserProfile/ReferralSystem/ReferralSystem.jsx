import { Box, Typography, TextField, Button } from "@mui/material"
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import './ReferralSystem.css'


const ReferralSystem = () => {
    return (
        <Box className='referral-system-container'>
            <Typography className="referral-system-titile">Делитесь реферальной ссылкой с друзьями!</Typography>

            <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', width: '100%' }}>
                <TextField className='referral-system-form-field' fullWidth label='Реферальный код' value='JHD989829'/>
                <Button className='referral-system-form-btn' onClick={() => navigator.clipboard.writeText('http://referral/JHD989829')}><ContentCopyIcon /></Button> 
            </Box>
        </Box>
    )
}

export default ReferralSystem