import { Box, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
import './PaymentInfoCard.css'

const PaymentInfoCard = ({ uid, title, date, price, type }) => {
    const navigate = useNavigate()
    const cardColorClass = type === 'debit' ? 'debit-color' : 'credit-color';
    
    const navigatePaymentCard = () => {
        navigate(`/payment-info/${uid}`)
    }
    

    return (
        <Box className={`payment-card-container ${cardColorClass}`} onClick={() => navigatePaymentCard()}>
            <Box className='payment-card-header'>
                <Typography className='payment-card-title'>{title}</Typography>
                <Typography className='payment-card-time'>{date}</Typography>
            </Box>
            <Box className='payment-card-price-container'>
                <Typography className='payment-card-price'>
                    {type === 'debit' ? '-' : '+'}{price}₽
                </Typography>
            </Box>
        </Box>
    )
}

export default PaymentInfoCard