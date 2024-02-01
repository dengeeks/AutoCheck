import { Box, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
import './PaymentInfoCard.css'

const PaymentInfoCard = ({ title, date, price, type }) => {
    const cardColorClass = type === 'Withdraw' ? 'withdraw-color' : 'payment-color';

    return (
        <Box className={`payment-card-container ${cardColorClass}`}>
            <Box className='payment-card-header'>
                <Typography className='payment-card-title'>{title}</Typography>
                <Typography className='payment-card-time'>{date}</Typography>
            </Box>
            <Box className='payment-card-price-container'>
                <Typography className='payment-card-price'>
                    {type === 'Withdraw' ? '-' : '+'}{price}₽
                </Typography>
            </Box>
        </Box>
    )
}

export default PaymentInfoCard