import { Box, Typography, Select, MenuItem, Button, TextField } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import Loader from "../../../components/Loader/Loader"
import './PaymentSettings.css'

import { getPaymentSettings } from "../../../api/Payment/getPaymentSettings"
import { changePaymentSettings } from "../../../api/Admin/paymentSettings/changePaymentSettings"
import AuthContext from "../../../context/AuthContext"


const PaymentSettings = () => {
    const [commissionType, setCommisionType] = useState({ commission: null, bonus_procent: null })
    const [isLoading, setIsLoading] = useState(true)
    const {authTokens} = useContext(AuthContext)

    useEffect(() => {
        getPaymentSettings({ setData: setCommisionType, setLoading: setIsLoading })
    }, [])

    const handleSubmitPaymentSettings = () => {
        changePaymentSettings({ 
            commission: commissionType.commission,
            bonus_procent: commissionType.bonus_procent, 
            token: authTokens.access
        })
    }

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
                value={commissionType.commission || ''}
                fullWidth
                onChange={(e) => setCommisionType((prevCommissionType) => ({
                    ...prevCommissionType,
                    commission: e.target.value,
                  }))}                  
                displayEmpty
                sx={{ marginTop: '10px' }}
            >
                <MenuItem value="" disabled>Выберите тип комиссии</MenuItem>
                <MenuItem value="site_side">Комиссия на стороне сайта</MenuItem>
                <MenuItem value="user_side">Комиссия на стороне пользователя</MenuItem>
                <MenuItem value="equal">комиссия 50 на 50</MenuItem>
            </Select>

            <Box sx={{ marginTop: '20px' }}>
                <Typography className='payment-settings-title'>
                    Процент начисления бонуса
                </Typography>
                <TextField
                    sx={{ marginTop: '10px' }}
                    fullWidth 
                    type='number'
                    label='Процент'
                    value={commissionType.bonus_procent}
                    onChange={(e) => setCommisionType((prevCommissionType) => ({
                        ...prevCommissionType,
                        bonus_procent: e.target.value,
                    }))}
                />
                <Button 
                    className='payment-settngs-btn' 
                    onClick={() => handleSubmitPaymentSettings()}
                >
                    Подтвердить
                </Button>
            </Box>
        </Box>
    )
}

export default PaymentSettings