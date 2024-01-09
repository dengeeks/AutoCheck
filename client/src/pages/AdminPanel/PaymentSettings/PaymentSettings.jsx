import { Box, Typography, Select, MenuItem, Button } from "@mui/material"
import { useEffect, useState } from "react"
import './PaymentSettings.css'


const PaymentSettings = () => {
    const [comissionType, setCommisionType] = useState()

    useEffect(() => {
        setCommisionType('equal')
    }, [])

    return (
        <Box className='payment-settings-container'>
            <Typography className='payment-settings-title'>
                Настройки платежей
            </Typography>
            <Select
                labelId="color-selector-label"
                value={comissionType || ''}
                fullWidth
                onChange={(e) => setCommisionType(e.target.value)}
                displayEmpty
                sx={{ marginTop: '10px' }}
            >
                <MenuItem value="" disabled>Выберите тип комиссии</MenuItem>
                <MenuItem value="user_side">Комиссия на стороне сайта</MenuItem>
                <MenuItem value="site_side">Комиссия на стороне пользователя</MenuItem>
                <MenuItem value="equal">комиссия 50 на 50</MenuItem>
            </Select>
            <Button className='payment-settngs-btn'>
                Подтвердить
            </Button>
        </Box>
    )
}

export default PaymentSettings