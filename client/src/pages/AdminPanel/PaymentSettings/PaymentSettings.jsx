import { Box, Typography, Select, MenuItem, Button } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import Loader from "../../../components/Loader/Loader"
import './PaymentSettings.css'

import { getPaymentSettings } from "../../../api/Payment/getPaymentSettings"
import { changePaymentSettings } from "../../../api/Admin/paymentSettings/changePaymentSettings"
import AuthContext from "../../../context/AuthContext"


const PaymentSettings = () => {
    const [commissionType, setCommisionType] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const {authTokens} = useContext(AuthContext)

    useEffect(() => {
        getPaymentSettings({ setData: setCommisionType, setLoading: setIsLoading })
    }, [])

    const handleSubmitPaymentSettings = () => {
        changePaymentSettings({ commission: commissionType, token: authTokens.access })
    }

    console.log(commissionType)

    if (isLoading) {
        return(
            <Loader />
        )
    }
    return (
        <Box className='payment-settings-container'>
            <Typography className='payment-settings-title'>
                Настройки платежей
            </Typography>
            <Select
                labelId="color-selector-label"
                value={commissionType || ''}
                fullWidth
                onChange={(e) => setCommisionType(e.target.value)}
                displayEmpty
                sx={{ marginTop: '10px' }}
            >
                <MenuItem value="" disabled>Выберите тип комиссии</MenuItem>
                <MenuItem value="site_side">Комиссия на стороне сайта</MenuItem>
                <MenuItem value="user_side">Комиссия на стороне пользователя</MenuItem>
                <MenuItem value="equal">комиссия 50 на 50</MenuItem>
            </Select>
            <Button className='payment-settngs-btn' onClick={() => handleSubmitPaymentSettings()}>
                Подтвердить
            </Button>
        </Box>
    )
}

export default PaymentSettings