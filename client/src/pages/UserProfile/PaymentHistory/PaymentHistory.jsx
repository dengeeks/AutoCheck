import { Typography, Box, Container, Grid } from "@mui/material"

import PaymentInfoCard from "../../../components/PaymentInfoCard/PaymentInfoCard"
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import './PaymentHistory.css'

const PaymentHistory = () => {
    const navigatePaymentCard = () => {
    }
    return(
        <Box>
            <Typography className='payment-history-title'>История платежей</Typography>
            <Grid container sx={{ marginTop: '20px' }}>
                <Grid item xs={4}>
                    <Box className='profile-payment-history-header'>
                        <LocalMallIcon />
                        <Typography className='profile-payment-history-title'>Списание средств</Typography>
                    </Box>
                    <PaymentInfoCard
                        uid="JI989823"
                        title="Покупка тарифа Стандарт"
                        date="2023-12-23 14:22"
                        price={200}
                        type='debit'
                    />
                    <PaymentInfoCard
                        uid="JI989823"
                        title="Покупка пакета Премиум"
                        date="2023-12-30 16:11"
                        price={700}
                        type='debit'
                    />
                </Grid>
                <Grid item xs={4}>
                    <Box className='profile-payment-history-header'>
                        <AttachMoneyIcon />
                        <Typography className='profile-payment-history-title'>Пополнение баланса</Typography> 
                    </Box>  
                    <PaymentInfoCard
                        uid="JI989823"
                        title="Пополнение счета"
                        date="2023-12-23 13:08"
                        price={600}
                        type='credit'
                    />
                </Grid>
                <Grid item xs={4}>
                    <Box className='profile-payment-history-header'>
                        <GroupAddIcon />
                        <Typography className='profile-payment-history-title'>Бонусы за рефералов</Typography>      
                    </Box>                
                    <PaymentInfoCard
                        uid="JI989823"
                        title="Приглашенный пользователь"
                        date="2023-12-23 12:42"
                        price={100}
                        type='credit'
                    />
                    <PaymentInfoCard
                        uid="JI989823"
                        title="Приглашенный пользователь"
                        date="2023-12-23 12:42"
                        price={100}
                        type='credit'
                    />
                    <PaymentInfoCard
                        uid="JI989823"
                        title="Приглашенный пользователь"
                        date="2023-12-23 12:42"
                        price={100}
                        type='credit'
                    />
                </Grid>


            </Grid>
        </Box>
    )
}


export default PaymentHistory