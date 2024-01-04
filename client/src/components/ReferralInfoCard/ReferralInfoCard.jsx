import { Box, Typography, ListItem } from "@mui/material"
import './ReferralInfoCard.css'


const ReferralInfoCard = ({ avatar, first_name, last_name, date  }) => {
    const BASE_URL_WITHOUT_PREFIX = process.env.REACT_APP_BASE_URL_WITHOUT_PREFIX;


    return(
        <Box className='referral-card-container'>
            <img src={`${BASE_URL_WITHOUT_PREFIX}${avatar}`} alt="avatar" className='referral-card-avatar' />
            <Typography className='referral-card-username'>{first_name} {last_name}</Typography>

            {/* <Typography className='referral-card-text'>За этого пользователя вы получили</Typography> */}
            <Typography className='referral-card-price'>+0₽</Typography>
            <ListItem sx={{ display: 'flex', justifyContent: 'center' }}>
                <span style={{marginTop: '5px', marginRight: '3px'}}>•</span>
                <Typography className='referral-card-text'>Ничего не приобрел😞</Typography>
            </ListItem> 
            <Box className='referral-card-date-badge'>
                <Typography className='referral-card-badge-text'>{date}</Typography>
            </Box>
        </Box>            
    )
}

export default ReferralInfoCard